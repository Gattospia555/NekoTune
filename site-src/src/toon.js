// Cel shading + ink outlines, the look of a hand-painted anime background.
import * as THREE from "three";

// Two hard tones plus a thin mid band, nearest-filtered so the edge stays crisp.
export function toonRamp() {
  const data = new Uint8Array([105, 105, 105, 255, 182, 182, 182, 255, 255, 255, 255, 255]);
  const t = new THREE.DataTexture(data, 3, 1, THREE.RGBAFormat);
  t.minFilter = t.magFilter = THREE.NearestFilter;
  t.generateMipmaps = false;
  t.needsUpdate = true;
  return t;
}

/** Replace every material in the glTF with a toon one of the same colour. */
export function toonify(root, ramp) {
  const cache = new Map();
  root.traverse((o) => {
    if (!o.isMesh) return;
    const src = o.material;
    const key = src.name + "|" + src.color.getHexString();
    if (!cache.has(key)) {
      const m = new THREE.MeshToonMaterial({ color: src.color.clone(), gradientMap: ramp, name: src.name });
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
    this.normalMat = new THREE.MeshNormalMaterial();
    this.uniforms = {
      tDiffuse: { value: null },
      tNormal: { value: this.target.texture },
      tDepth: { value: this.target.depthTexture },
      resolution: { value: new THREE.Vector2(1, 1) },
      cameraNear: { value: camera.near },
      cameraFar: { value: camera.far },
      ink: { value: new THREE.Color(opts.ink ?? "#3a2d36") },
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
        uniform vec3 ink;
        varying vec2 vUv;
        float depthAt(vec2 uv){
          float d = texture2D(tDepth, uv).x;
          float vz = perspectiveDepthToViewZ(d, cameraNear, cameraFar);
          return -vz;
        }
        vec3 nAt(vec2 uv){ return texture2D(tNormal, uv).xyz * 2.0 - 1.0; }
        float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
        void main(){
          vec4 col = texture2D(tDiffuse, vUv);
          vec2 px = thickness / resolution;
          float dc = depthAt(vUv);
          float dl = depthAt(vUv - vec2(px.x,0.)), dr = depthAt(vUv + vec2(px.x,0.));
          float du = depthAt(vUv + vec2(0.,px.y)), dd = depthAt(vUv - vec2(0.,px.y));
          // depth edge, relative to distance so far things don't turn black
          float de = (abs(dl + dr - 2.0*dc) + abs(du + dd - 2.0*dc)) / max(dc, 0.001);
          float depthEdge = smoothstep(0.012, 0.035, de);
          vec3 nc = nAt(vUv);
          float ne = distance(nc, nAt(vUv - vec2(px.x,0.))) + distance(nc, nAt(vUv + vec2(px.x,0.)))
                   + distance(nc, nAt(vUv + vec2(0.,px.y))) + distance(nc, nAt(vUv - vec2(0.,px.y)));
          float normalEdge = smoothstep(0.55, 1.1, ne);
          float bg = step(0.9999, texture2D(tDepth, vUv).x);
          float e = max(depthEdge, normalEdge) * strength * (1.0 - bg * (1.0 - depthEdge));
          vec3 lineCol = mix(col.rgb * ink * 1.4, ink, 0.6);
          vec3 c = mix(col.rgb, lineCol, e);
          // a whisper of paper grain
          float g = hash(floor(vUv * resolution / 1.5) + floor(time * 12.0)) - 0.5;
          c += g * paper * (1.0 - bg);
          gl_FragColor = vec4(c, col.a);
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
    this.scene.overrideMaterial = this.normalMat;
    this.scene.background = null;
    const prevClear = r.getClearColor(new THREE.Color());
    const prevAlpha = r.getClearAlpha();
    r.setRenderTarget(this.target);
    r.setClearColor(0x8080ff, 1);
    r.clear();
    r.render(this.scene, this.camera);
    r.setRenderTarget(null);
    r.setClearColor(prevClear, prevAlpha);
    this.scene.overrideMaterial = prevOverride;
    this.scene.background = prevBg;
    this.camera.layers.mask = prevMask;
    this.uniforms.cameraNear.value = this.camera.near;
    this.uniforms.cameraFar.value = this.camera.far;
  }
}
