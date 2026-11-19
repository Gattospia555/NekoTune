// Cel shading + ink outlines, the look of a hand-painted anime background.
import * as THREE from "three";

// Two hard tones plus a thin mid band, nearest-filtered so the edge stays crisp.
export function toonRamp(soft = false) {
  const data = soft
    ? new Uint8Array([196, 196, 196, 255, 228, 228, 228, 255, 255, 255, 255, 255])
    : new Uint8Array([105, 105, 105, 255, 182, 182, 182, 255, 255, 255, 255, 255]);
  const t = new THREE.DataTexture(data, 3, 1, THREE.RGBAFormat);
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.needsUpdate = true;
  return t;
}

/** Replace every material in the glTF with a toon one of the same colour. */
export function toonify(root, ramp, catRamp = ramp) {
  const cache = new Map();
  root.traverse((o) => {
    if (!o.isMesh) return;
    const src = o.material;
    const cat = /^(neko|luna)_(?!cushion)/.test(o.name);
    o.userData.ink = cat ? (o.name.startsWith("neko") ? 2 : 3) : 1;
    const key = src.name + "|" + src.color.getHexString() + (cat ? "|cat" : "");
    if (!cache.has(key)) {
      const m = new THREE.MeshToonMaterial({ color: src.color.clone(), gradientMap: cat ? catRamp : ramp, name: src.name });
      cache.set(key, m);
    }
    o.material = cache.get(key);
    o.castShadow = true;
    // characters are shaded by their own form only: cast shadows on fur look like dirt
    o.receiveShadow = !/^(neko|luna)_(?!cushion)/.test(o.name);
  });
  return cache;
}

/**
 * Screen-space outline from depth + normals (Sobel), drawn in ink colour.
 * Usage: const ink = new InkPass(renderer, scene, camera); composer.addPass(ink.pass)
 */
export class InkPass {
  constructor(renderer, scene, camera, opts = {}) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.target = new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType });
    this.target.depthTexture = new THREE.DepthTexture(1, 1);
    this.target.depthTexture.type = THREE.UnsignedIntType;
    const pre = (id) =>
      new THREE.ShaderMaterial({
        uniforms: { id: { value: id } },
        vertexShader: "varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
        fragmentShader: "uniform float id; varying vec3 vN; void main(){ gl_FragColor = vec4(normalize(vN) * 0.5 + 0.5, id); }",
      });
    this.preMats = { 1: pre(1), 2: pre(0.6), 3: pre(0.3) };
    this.swap = [];
    this.uniforms = {
      tDiffuse: { value: null },
      tNormal: { value: this.target.texture },
      tDepth: { value: this.target.depthTexture },
      resolution: { value: new THREE.Vector2(1, 1) },
      cameraNear: { value: camera.near },
      cameraFar: { value: camera.far },
      ink: { value: new THREE.Color(opts.ink ?? "#3a2d36") },
      nekoInk: { value: new THREE.Color(opts.nekoInk ?? "#e0764a") },
      lunaInk: { value: new THREE.Color(opts.lunaInk ?? "#8e78bd") },
      thickness: { value: opts.thickness ?? 1.2 },
      strength: { value: opts.strength ?? 0.85 },
      paper: { value: opts.paper ?? 0.035 },
      time: { value: 0 },
    };
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: /* glsl */ `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: /* glsl */ `
        #include <packing>
        uniform sampler2D tDiffuse, tNormal, tDepth;
        uniform vec2 resolution;
        uniform float cameraNear, cameraFar, thickness, strength, paper, time;
        uniform vec3 ink, nekoInk, lunaInk;
        varying vec2 vUv;
        float depthAt(vec2 uv){ return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, cameraNear, cameraFar); }
        vec4 nAt(vec2 uv){ vec4 t = texture2D(tNormal, uv); return vec4(t.xyz * 2.0 - 1.0, t.a); }
        float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
        // edge strength at a given radius; also reports the "ink id" of the nearest sample
        float edgeAt(vec2 px, out float idNear, float useNormals){
          float dc = depthAt(vUv);
          vec2 o[4]; o[0] = vec2(-px.x,0.); o[1] = vec2(px.x,0.); o[2] = vec2(0.,px.y); o[3] = vec2(0.,-px.y);
          vec4 nc = nAt(vUv);
          float dmin = dc; idNear = nc.a;
          float lap = 0.0; float ne = 0.0;
          float ds[4];
          for (int i = 0; i < 4; i++) {
            vec2 uv = vUv + o[i];
            ds[i] = depthAt(uv);
            vec4 n = nAt(uv);
            ne += distance(nc.xyz, n.xyz);
            if (ds[i] < dmin) { dmin = ds[i]; idNear = n.a; }
          }
          float de = (abs(ds[0] + ds[1] - 2.0*dc) + abs(ds[2] + ds[3] - 2.0*dc)) / max(dc, 0.001);
          return max(smoothstep(0.012, 0.035, de), smoothstep(0.55, 1.1, ne) * useNormals);
        }
        void main(){
          vec4 col = texture2D(tDiffuse, vUv);
          vec2 px = thickness / resolution;
          float id1; float e = edgeAt(px, id1, 1.0);
          float id = id1;
          // the cats get a fatter, coloured outline, like the mascot drawings
          float id2; float e2 = edgeAt(px * 1.8, id2, 0.0);
          // fat lines only when the cat is close enough to have room for them
          float near = 1.0 - smoothstep(9.0, 16.0, depthAt(vUv));
          if (id2 < 0.8) { id = min(id, id2); e = max(e, e2 * near); }
          // drawn characters (id 0.9) keep their own outline: no ink around them
          if (abs(id - 0.9) < 0.05) e = 0.0;
          float bg = step(0.9999, texture2D(tDepth, vUv).x);
          vec3 lineCol = mix(col.rgb * ink * 1.4, ink, 0.6);
          float k = strength;
          if (id < 0.8) {
            lineCol = id < 0.45 ? lunaInk : nekoInk;
            k = min(1.0, strength * 1.25);
          }
          float a = col.a;
          if (bg > 0.5 && id < 0.8) a = max(a, e * k);
          vec3 c = mix(col.rgb, lineCol, e * k);
          float g = hash(floor(vUv * resolution / 1.5) + floor(time * 12.0)) - 0.5;
          c += g * paper * (1.0 - bg);
          gl_FragColor = vec4(c, a);
        }`,
    });
  }
  setSize(w, h, dpr) {
    this.target.setSize(Math.floor(w * dpr), Math.floor(h * dpr));
    this.uniforms.resolution.value.set(w * dpr, h * dpr);
  }
  /** Render normals + depth of the scene (call before the composer). */
  prepare(layerMask) {
    const r = this.renderer;
    const prevOverride = this.scene.overrideMaterial;
    const prevBg = this.scene.background;
    const prevMask = this.camera.layers.mask;
    if (layerMask != null) this.camera.layers.mask = layerMask;
    this.scene.background = null;
    const swap = this.swap;
    swap.length = 0;
    this.scene.traverse((o) => {
      if (!o.isMesh || !o.visible) return;
      swap.push(o, o.material);
      o.material = o.userData.preMat || this.preMats[o.userData.ink || 1];
    });
    const prevClear = r.getClearColor(new THREE.Color());
    const prevAlpha = r.getClearAlpha();
    r.setRenderTarget(this.target);
    r.setClearColor(0x8080ff, 1);
    r.clear();
    r.render(this.scene, this.camera);
    r.setRenderTarget(null);
    r.setClearColor(prevClear, prevAlpha);
    for (let i = 0; i < swap.length; i += 2) swap[i].material = swap[i + 1];
    this.scene.overrideMaterial = prevOverride;
    this.scene.background = prevBg;
    this.camera.layers.mask = prevMask;
    this.uniforms.cameraNear.value = this.camera.near;
    this.uniforms.cameraFar.value = this.camera.far;
  }
}
