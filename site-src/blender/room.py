# Neko's room, built with Blender from Python and exported as glTF.
# Coordinates in this file are three.js coordinates (x right, y up, z toward
# the camera); `P()` converts them to Blender's (x, -z, y).
import bpy, bmesh, math, sys
from mathutils import Vector, Euler

OUT = sys.argv[sys.argv.index("--") + 1] if "--" in sys.argv else "/home/claude/site3d/page/media/room.glb"

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

def P(x, y, z):
    return Vector((x, -z, y))

def R(rx=0, ry=0, rz=0):
    # rotation given in three.js axes (degrees)
    return Euler((math.radians(rx), math.radians(-rz), math.radians(ry)), "XZY")

# ------------------------------------------------------------------ palette
# Picked to sit under a cel-shading pass: never pure, slightly dusty.
COLORS = {
    "floor": "#d9a46c", "floor2": "#cf9860", "slab": "#8c5f45", "slabDark": "#5e3f35",
    "wall": "#f3e6cf", "wall2": "#e9d6b8", "wallEdge": "#c9b08f", "base": "#b98b66",
    "wood": "#a8714c", "woodDark": "#7c5038", "woodLight": "#d4a275",
    "cream": "#f7efe0", "white": "#fbf8f2", "ink": "#3a2d36", "metal": "#8e8a96",
    "teal": "#5fb3a8", "tealDark": "#3e8b84", "sage": "#93b07a", "leaf": "#6f9e5b", "leafDark": "#4f7d48",
    "pot": "#d8775a", "red": "#d65b4a", "yellow": "#f2c14e", "blue": "#5a7fb8", "lilac": "#b6a0dc",
    "rug": "#e7b9a0", "rug2": "#c98d78", "cushion": "#6c8fc4", "cushion2": "#4f6fa3",
    "screen": "#1d2333", "record": "#2a2430", "label": "#ffb37e", "glass": "#bfe6e8",
    "curtain": "#e9a0a0", "curtain2": "#d48585", "bulb": "#fff2c4", "lampshade": "#f5d9a6",
    "neko": "#ffb37e", "nekoDark": "#f28a5b", "nekoCream": "#ffe3c8", "nekoInner": "#f6a08f",
    "luna": "#efe9f8", "lunaDark": "#b9a3e3", "lunaInner": "#f2b8c6",
    "eye": "#2b1d16", "nose": "#c75b5b", "blush": "#ff9aa2", "phones": "#5a4a7a", "phonesPad": "#ffb37e",
    "book1": "#5fb3a8", "book2": "#e5a54b", "book3": "#d65b4a", "book4": "#6c8fc4", "book5": "#93b07a",
    "sky": "#8fd3cf", "led": "#d65b4a", "nekoLine": "#e0764a", "lunaLine": "#8e78bd", "whisk": "#7a4a3e", "lunaWhisk": "#6f5f8f", "nekoEar": "#ffc4a3", "lunaEar": "#f6c2d2",
}
MATS = {}

def hex2lin(h):
    h = h.lstrip("#")
    c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
    return [x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c]

def mat(name):
    if name in MATS:
        return MATS[name]
    m = bpy.data.materials.new("c_" + name)
    m.use_nodes = True
    b = m.node_tree.nodes.get("Principled BSDF")
    b.inputs["Base Color"].default_value = (*hex2lin(COLORS[name]), 1)
    b.inputs["Roughness"].default_value = 0.8
    MATS[name] = m
    return m

COL = bpy.data.collections.new("room")
scene.collection.children.link(COL)

def finish(o, color, bevel=0.0, seg=3, smooth=True, angle=40, parent=None):
    if o.name not in COL.objects:
        for c in o.users_collection:
            c.objects.unlink(o)
        COL.objects.link(o)
    if color:
        o.data.materials.clear()
        o.data.materials.append(mat(color))
    if bevel > 0:
        m = o.modifiers.new("bevel", "BEVEL")
        m.width = bevel
        m.segments = seg
        m.limit_method = "ANGLE"
        m.harden_normals = False
    if smooth and o.type == "MESH":
        for p in o.data.polygons:
            p.use_smooth = True
        try:
            o.data.set_sharp_from_angle(angle=math.radians(angle))
        except Exception:
            pass
    if parent is not None:
        bpy.context.view_layer.update()
        mw = o.matrix_world.copy()
        o.parent = parent
        o.matrix_world = mw
    return o

def new_obj(name, mesh):
    o = bpy.data.objects.new(name, mesh)
    COL.objects.link(o)
    return o

def box(name, size, pos, color, bevel=0.04, rot=(0, 0, 0), parent=None, seg=3):
    sx, sy, sz = size
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1)
    bmesh.ops.scale(bm, vec=Vector((sx, sz, sy)), verts=bm.verts)
    bm.to_mesh(me)
    bm.free()
    o = new_obj(name, me)
    o.location = P(*pos)
    o.rotation_euler = R(*rot)
    bpy.context.view_layer.update()
    return finish(o, color, bevel=min(bevel, min(size) * 0.45), parent=parent, seg=seg)

def cyl(name, r, h, pos, color, bevel=0.03, verts=32, rot=(0, 0, 0), parent=None, r2=None):
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_cone(bm, cap_ends=True, segments=verts, radius1=r, radius2=r if r2 is None else r2, depth=h)
    bm.to_mesh(me)
    bm.free()
    o = new_obj(name, me)
    o.location = P(*pos)
    o.rotation_euler = R(*rot)
    bpy.context.view_layer.update()
    return finish(o, color, bevel=min(bevel, h * 0.45, r * 0.45) if bevel else 0, parent=parent)

def sphere(name, r, pos, color, scale=(1, 1, 1), rot=(0, 0, 0), parent=None, seg=32):
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=seg, v_segments=seg // 2, radius=r)
    bm.to_mesh(me)
    bm.free()
    o = new_obj(name, me)
    o.location = P(*pos)
    o.rotation_euler = R(*rot)
    o.scale = (scale[0], scale[2], scale[1])
    bpy.context.view_layer.update()
    return finish(o, color, parent=parent)

def torus(name, R1, r, pos, color, rot=(0, 0, 0), parent=None):
    bpy.ops.mesh.primitive_torus_add(major_radius=R1, minor_radius=r, major_segments=48, minor_segments=16)
    o = bpy.context.active_object
    o.name = name
    o.location = P(*pos)
    o.rotation_euler = R(*rot)
    bpy.context.view_layer.update()
    return finish(o, color, parent=parent)

def tube(name, pts, radius, color, parent=None, res=10, taper=None, cap=True):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = radius
    cu.bevel_resolution = 4
    cu.use_fill_caps = cap
    sp = cu.splines.new("BEZIER")
    sp.bezier_points.add(len(pts) - 1)
    for i, p in enumerate(pts):
        bp = sp.bezier_points[i]
        bp.co = P(*p)
        bp.handle_left_type = bp.handle_right_type = "AUTO"
        if taper:
            bp.radius = taper[i]
    sp.resolution_u = res
    o = bpy.data.objects.new(name, cu)
    COL.objects.link(o)
    bpy.context.view_layer.objects.active = o
    for ob in bpy.context.selected_objects:
        ob.select_set(False)
    o.select_set(True)
    bpy.ops.object.convert(target="MESH")
    o = bpy.context.active_object
    return finish(o, color, parent=parent)

def blob(name, elems, color, res=0.045, parent=None, thresh=0.6):
    """Soft organic shape from metaballs: elems = [(pos, radius, (sx,sy,sz))]."""
    mb = bpy.data.metaballs.new(name)
    mb.resolution = res
    mb.render_resolution = res
    mb.threshold = thresh
    for pos, rad, sc in elems:
        e = mb.elements.new()
        e.type = "ELLIPSOID"
        e.co = P(*pos)
        e.radius = rad
        e.size_x, e.size_y, e.size_z = sc[0], sc[2], sc[1]
    o = bpy.data.objects.new(name, mb)
    COL.objects.link(o)
    for ob in bpy.context.selected_objects:
        ob.select_set(False)
    bpy.context.view_layer.objects.active = o
    o.select_set(True)
    bpy.ops.object.convert(target="MESH")
    o = bpy.context.active_object
    o.name = name
    o.data.name = name
    # relax the metaball grid a little
    m = o.modifiers.new("smooth", "SMOOTH")
    m.factor = 0.6
    m.iterations = 6
    return finish(o, color, parent=parent)

def empty(name, pos, parent=None):
    o = bpy.data.objects.new(name, None)
    COL.objects.link(o)
    o.location = P(*pos)
    bpy.context.view_layer.update()
    if parent is not None:
        mw = o.matrix_world.copy()
        o.parent = parent
        o.matrix_world = mw
        bpy.context.view_layer.update()
    return o

def join(name, objs):
    for ob in bpy.context.selected_objects:
        ob.select_set(False)
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    # apply modifiers before joining
    for o in objs:
        bpy.context.view_layer.objects.active = o
        for m in list(o.modifiers):
            bpy.ops.object.modifier_apply(modifier=m.name)
    bpy.context.view_layer.objects.active = objs[0]
    bpy.ops.object.join()
    o = bpy.context.active_object
    o.name = name
    return o

def plane(name, w, h, pos, color, rot=(0, 0, 0), parent=None):
    me = bpy.data.meshes.new(name)
    bm = bmesh.new()
    bmesh.ops.create_grid(bm, x_segments=1, y_segments=1, size=0.5)
    bmesh.ops.scale(bm, vec=Vector((w, h, 1)), verts=bm.verts)
    uv = bm.loops.layers.uv.new()
    for f in bm.faces:
        for l in f.loops:
            l[uv].uv = (l.vert.co.x / w + 0.5, 0.5 - l.vert.co.y / h)
    bm.to_mesh(me)
    bm.free()
    o = new_obj(name, me)
    o.location = P(*pos)
    # grid faces +Z in Blender = +Y in three; rotate so it faces +z (three) by default
    o.rotation_euler = R(rot[0] + 90, rot[1], rot[2])
    o.rotation_euler = (math.radians(90) + math.radians(rot[0]), math.radians(-rot[2]), math.radians(rot[1]))
    return finish(o, color, smooth=False, parent=parent)

# ================================================================== shell
W = 5.0   # half size of the floor
H = 5.6   # wall height
box("slab", (2 * W + 0.4, 0.7, 2 * W + 0.4), (0, -0.35, 0), "slab", bevel=0.12)
box("slab_under", (2 * W + 0.1, 0.5, 2 * W + 0.1), (0, -0.85, 0), "slabDark", bevel=0.15)
# floor boards (separate planks give the outline pass something to draw)
n = 8
for i in range(n):
    x0 = -W + i * (2 * W / n)
    box(f"plank{i}", (2 * W / n - 0.03, 0.08, 2 * W), (x0 + W / n, 0.04, 0), "floor" if i % 2 else "floor2", bevel=0.025)
# walls
box("wall_back", (2 * W + 0.3, H, 0.3), (0.15 - 0.15, H / 2, -W - 0.15), "wall", bevel=0.05)
box("wall_left", (0.3, H, 2 * W), (-W - 0.15, H / 2, 0), "wall2", bevel=0.05)
box("wall_back_cap", (2 * W + 0.36, 0.14, 0.38), (0, H + 0.07, -W - 0.15), "wallEdge", bevel=0.04)
box("wall_left_cap", (0.38, 0.14, 2 * W + 0.06), (-W - 0.15, H + 0.07, 0.03), "wallEdge", bevel=0.04)
box("skirt_back", (2 * W, 0.28, 0.08), (0, 0.22, -W + 0.04), "base", bevel=0.02)
box("skirt_left", (0.08, 0.28, 2 * W), (-W + 0.04, 0.22, 0), "base", bevel=0.02)

# window in the back wall: frame, mullions, sill, sky card behind
WX, WY, WW, WH = 2.55, 3.15, 2.9, 2.5
frame = []
frame.append(box("win_top", (WW + 0.3, 0.18, 0.36), (WX, WY + WH / 2, -W + 0.02), "white", bevel=0.04))
frame.append(box("win_bot", (WW + 0.5, 0.16, 0.6), (WX, WY - WH / 2 - 0.02, -W + 0.12), "white", bevel=0.05))
frame.append(box("win_l", (0.18, WH, 0.36), (WX - WW / 2, WY, -W + 0.02), "white", bevel=0.04))
frame.append(box("win_r", (0.18, WH, 0.36), (WX + WW / 2, WY, -W + 0.02), "white", bevel=0.04))
frame.append(box("win_mid", (0.09, WH, 0.12), (WX, WY, -W + 0.02), "white", bevel=0.02))
frame.append(box("win_mid2", (WW, 0.09, 0.12), (WX, WY + 0.3, -W + 0.02), "white", bevel=0.02))
# the "hole": a sky card sits just in front of the wall surface, the frame covers its edges
plane("window_sky", WW - 0.1, WH - 0.1, (WX, WY, -W + 0.005), "sky")
# curtains with soft folds
for side in (-1, 1):
    pts = []
    cx = WX + side * (WW / 2 + 0.25)
    folds = []
    for k in range(4):
        folds.append(cyl(f"curtain{side}_{k}", 0.13, 3.1, (cx + side * 0.0 + (k - 1.5) * 0.17 * side, WY + 0.05, -W + 0.35 + (k % 2) * 0.06), "curtain" if k % 2 else "curtain2", bevel=0.05, verts=16))
    join(f"curtain_{'l' if side < 0 else 'r'}", folds)
cyl("curtain_rod", 0.05, WW + 1.6, (WX, WY + WH / 2 + 0.32, -W + 0.4), "woodDark", rot=(0, 0, 90), bevel=0.02)

# string lights along the top of both walls (bulbs light up at night)
bulbs = []
for i in range(14):
    t = i / 13
    x = -W + 0.3 + t * (2 * W - 0.8)
    y = H - 0.35 - 0.18 * math.sin(t * math.pi * 6) ** 2
    bulbs.append(sphere(f"bulb_b{i}", 0.075, (x, y, -W + 0.22), "bulb", seg=12))
for i in range(12):
    t = i / 11
    z = -W + 0.5 + t * (2 * W - 1.2)
    y = H - 0.35 - 0.18 * math.sin(t * math.pi * 5) ** 2
    bulbs.append(sphere(f"bulb_l{i}", 0.075, (-W + 0.22, y, z), "bulb", seg=12))
join("bulbs", bulbs)
wire_pts_b = [(-W + 0.3 + t / 20 * (2 * W - 0.8), H - 0.3 - 0.18 * math.sin(t / 20 * math.pi * 6) ** 2, -W + 0.2) for t in range(21)]
wire_pts_l = [(-W + 0.2, H - 0.3 - 0.18 * math.sin(t / 20 * math.pi * 5) ** 2, -W + 0.5 + t / 20 * (2 * W - 1.2)) for t in range(21)]
tube("wire_b", wire_pts_b, 0.012, "ink", res=4)
tube("wire_l", wire_pts_l, 0.012, "ink", res=4)

# ================================================================== furniture
# rug
cyl("rug", 2.7, 0.06, (0.2, 0.11, 0.9), "rug", bevel=0.025, verts=64)
cyl("rug_ring", 2.15, 0.065, (0.2, 0.115, 0.9), "rug2", bevel=0.02, verts=64)
cyl("rug_in", 1.75, 0.07, (0.2, 0.12, 0.9), "rug", bevel=0.02, verts=64)

# media console on the left wall, TV above it
box("console", (1.0, 0.95, 3.6), (-W + 0.5, 0.55, -0.9), "wood", bevel=0.06)
box("console_top", (1.1, 0.1, 3.75), (-W + 0.55, 1.07, -0.9), "woodLight", bevel=0.04)
for k, z in enumerate((-2.0, -0.9, 0.2)):
    box(f"console_door{k}", (0.06, 0.7, 1.0), (-W + 1.02, 0.55, z), "woodLight", bevel=0.02)
    cyl(f"console_knob{k}", 0.05, 0.08, (-W + 1.07, 0.7, z + 0.35), "woodDark", rot=(0, 0, 90))
for z in (-2.55, 0.75):
    cyl(f"console_leg{z}", 0.06, 0.12, (-W + 0.5, 0.06 + 0.02, z), "woodDark", bevel=0)
TVZ, TVY = -0.9, 2.75
box("tv_body", (0.22, 2.05, 3.35), (-W + 0.2, TVY, TVZ), "ink", bevel=0.08)
plane("tv_screen", 3.12, 1.82, (-W + 0.315, TVY, TVZ), "screen", rot=(0, 90, 0))
box("tv_led", (0.04, 0.05, 0.12), (-W + 0.32, TVY - 0.95, TVZ + 1.45), "led", bevel=0.01)
# a few things on the console
box("console_book", (0.6, 0.12, 0.45), (-W + 0.5, 1.18, -2.4), "book3", bevel=0.02)
box("console_book2", (0.55, 0.1, 0.42), (-W + 0.52, 1.29, -2.38), "book1", bevel=0.02)
cyl("console_cup", 0.11, 0.24, (-W + 0.55, 1.24, 0.5), "teal", bevel=0.02, verts=20)
tube("console_cup_handle", [(-W + 0.55, 1.3, 0.62), (-W + 0.55, 1.24, 0.7), (-W + 0.55, 1.18, 0.62)], 0.018, "teal", res=6)

# turntable cabinet against the back wall, speakers on the sides
CX = -1.6
box("deck_cabinet", (3.6, 1.05, 1.15), (CX, 0.62, -W + 0.62), "wood", bevel=0.06)
box("deck_cabinet_top", (3.75, 0.1, 1.25), (CX, 1.19, -W + 0.64), "woodLight", bevel=0.04)
for k in range(3):
    box(f"deck_slot{k}", (1.0, 0.7, 0.05), (CX - 1.15 + k * 1.15, 0.6, -W + 1.2), "woodLight", bevel=0.02)
# vinyls sitting in the cabinet's open middle slot
for k in range(6):
    box(f"cab_vinyl{k}", (0.05, 0.62, 0.62), (CX - 0.25 + k * 0.1, 0.55, -W + 0.75), ["book1", "book2", "book3", "book4", "book5", "lilac"][k], bevel=0.01)
deck = empty("deck", (CX, 1.24, -W + 0.68))
box("deck_base", (1.5, 0.22, 1.05), (CX, 1.36, -W + 0.68), "cream", bevel=0.06)
cyl("deck_platter", 0.48, 0.06, (CX - 0.18, 1.5, -W + 0.68), "metal", bevel=0.02, verts=48)
rec = cyl("record", 0.46, 0.035, (CX - 0.18, 1.54, -W + 0.68), "record", bevel=0.01, verts=48)
cyl("record_label", 0.15, 0.04, (CX - 0.18, 1.545, -W + 0.68), "label", bevel=0, verts=32)
# grooves as thin rings give the spin something to show
for k, rr in enumerate((0.24, 0.32, 0.4)):
    torus(f"groove{k}", rr, 0.004, (CX - 0.18, 1.56, -W + 0.68), "ink", rot=(0, 0, 0))
arm = empty("tonearm", (CX + 0.5, 1.55, -W + 0.32))
cyl("tonearm_base", 0.09, 0.12, (CX + 0.5, 1.53, -W + 0.32), "metal", bevel=0.02, verts=20)
arm_tube = tube("tonearm_tube", [(CX + 0.5, 1.62, -W + 0.32), (CX + 0.45, 1.63, -W + 0.75), (CX + 0.2, 1.6, -W + 1.0)], 0.022, "metal", res=8)
arm_head = box("tonearm_head", (0.1, 0.05, 0.16), (CX + 0.17, 1.59, -W + 1.04), "ink", bevel=0.015)
bpy.context.view_layer.update()
for o in (arm_tube, arm_head):
    mw = o.matrix_world.copy(); o.parent = arm; o.matrix_world = mw
cyl("deck_knob", 0.06, 0.06, (CX + 0.55, 1.5, -W + 1.05), "ink", bevel=0.01, verts=16)
for side, name in ((-1, "speaker_l"), (1, "speaker_r")):
    sx = CX + side * 1.35
    parts = [box(f"{name}_box", (0.8, 1.15, 0.8), (sx, 1.82, -W + 0.6), "woodDark", bevel=0.07)]
    sp = join(name, parts)
    cone = cyl(f"{name}_cone", 0.24, 0.06, (sx, 1.66, -W + 1.02), "ink", rot=(90, 0, 0), bevel=0.02, verts=32)
    cyl(f"{name}_cap", 0.1, 0.07, (sx, 1.66, -W + 1.04), "metal", rot=(90, 0, 0), bevel=0.02, verts=24, parent=cone)
    cyl(f"{name}_tweet", 0.1, 0.06, (sx, 2.13, -W + 1.02), "ink", rot=(90, 0, 0), bevel=0.02, verts=24)

# crate of records on the floor
box("crate", (1.3, 0.75, 0.95), (-3.0, 0.48, 2.6), "woodLight", bevel=0.04)
box("crate_in", (1.15, 0.7, 0.82), (-3.0, 0.53, 2.6), "woodDark", bevel=0.02)
crate_cols = ["book1", "book2", "book3", "book4", "book5", "lilac", "yellow", "teal"]
for k in range(8):
    box(f"crate_rec{k}", (0.07, 0.82, 0.78), (-3.45 + k * 0.125, 0.75, 2.6), crate_cols[k], bevel=0.015, rot=(0, 0, -8 + k * 2))
box("crate_rec_out", (0.86, 0.04, 0.86), (-1.8, 0.14, 2.95), "book2", bevel=0.012, rot=(0, 18, 0))
box("crate_rec_out_art", (0.5, 0.012, 0.5), (-1.62, 0.165, 3.02), "teal", bevel=0.005, rot=(0, 18, 0))
cyl("crate_rec_out_disc", 0.4, 0.025, (-2.2, 0.15, 2.75), "record", bevel=0.008, verts=48)
cyl("crate_rec_out_label", 0.13, 0.03, (-2.2, 0.152, 2.75), "label", bevel=0, verts=32)
torus("crate_rec_out_groove", 0.28, 0.006, (-2.2, 0.165, 2.75), "metal")

# desk + monitor under the window, chair in front
DX = 2.6
box("desk_top", (3.0, 0.12, 1.25), (DX, 1.55, -W + 0.75), "woodLight", bevel=0.04)
for lx in (-1.38, 1.38):
    for lz in (-0.5, 0.5):
        box(f"desk_leg{lx}{lz}", (0.1, 1.5, 0.1), (DX + lx, 0.78, -W + 0.75 + lz), "ink", bevel=0.02)
box("desk_drawer", (0.9, 0.45, 1.1), (DX + 0.9, 1.25, -W + 0.75), "cream", bevel=0.04)
box("pc_stand", (0.1, 0.45, 0.1), (DX - 0.2, 1.83, -W + 0.5), "ink", bevel=0.02)
box("pc_foot", (0.55, 0.05, 0.35), (DX - 0.2, 1.63, -W + 0.5), "ink", bevel=0.02)
box("pc_body", (1.55, 0.95, 0.09), (DX - 0.2, 2.4, -W + 0.52), "ink", bevel=0.04)
plane("pc_screen", 1.43, 0.83, (DX - 0.2, 2.4, -W + 0.575), "screen")
box("keyboard", (0.85, 0.05, 0.3), (DX - 0.2, 1.635, -W + 1.05), "white", bevel=0.02)
box("mouse", (0.12, 0.05, 0.18), (DX + 0.45, 1.635, -W + 1.08), "white", bevel=0.02)
cyl("mic_base", 0.12, 0.04, (DX + 0.95, 1.63, -W + 0.55), "ink", verts=20)
tube("mic_arm", [(DX + 0.95, 1.65, -W + 0.55), (DX + 0.95, 2.2, -W + 0.6), (DX + 0.7, 2.45, -W + 0.85)], 0.02, "ink", res=6)
cyl("mic", 0.07, 0.24, (DX + 0.68, 2.36, -W + 0.9), "ink", bevel=0.03, verts=24, rot=(20, 0, 15))
sphere("mic_grille", 0.11, (DX + 0.64, 2.53, -W + 0.96), "metal", scale=(1, 1.3, 1), rot=(20, 0, 15), seg=24)
# chair
ch = empty("chair", (DX - 0.2, 0, -W + 2.0))
box("chair_seat", (0.95, 0.16, 0.9), (DX - 0.2, 1.0, -W + 2.0), "lilac", bevel=0.07, parent=None)
box("chair_back", (0.95, 1.05, 0.14), (DX - 0.2, 1.62, -W + 2.42), "lilac", bevel=0.07)
cyl("chair_post", 0.06, 0.75, (DX - 0.2, 0.55, -W + 2.0), "metal", bevel=0)
for a in range(5):
    ang = a / 5 * math.pi * 2
    box(f"chair_foot{a}", (0.55, 0.07, 0.09), (DX - 0.2 + math.cos(ang) * 0.25, 0.15, -W + 2.0 + math.sin(ang) * 0.25), "ink", bevel=0.02, rot=(0, -math.degrees(ang), 0))

# floor lamp in the back-left corner
LX, LZ = -4.2, -3.9
lamp_parts = []
lamp_parts.append(cyl("lamp_foot", 0.38, 0.08, (LX, 0.12, LZ), "ink", bevel=0.03, verts=32))
lamp_parts.append(cyl("lamp_pole", 0.04, 3.2, (LX, 1.7, LZ), "ink", bevel=0))
lamp_g = join("lamp", lamp_parts)
cyl("lamp_shade", 0.5, 0.65, (LX, 3.45, LZ), "lampshade", bevel=0.03, verts=40, r2=0.32)
sphere("lamp_bulb", 0.16, (LX, 3.22, LZ), "bulb", seg=16)

# shelf on the left wall with books and the little lucky-cat statue
SY, SZ = 3.9, 2.6
box("shelf", (0.7, 0.1, 2.4), (-W + 0.35, SY, SZ), "woodLight", bevel=0.03)
for zz in (SZ - 0.9, SZ + 0.9):
    box(f"shelf_bracket{zz}", (0.5, 0.35, 0.06), (-W + 0.25, SY - 0.22, zz), "woodDark", bevel=0.02)
bz = SZ - 1.05
for k, (h, c) in enumerate([(0.7, "book1"), (0.62, "book2"), (0.75, "book3"), (0.58, "book4"), (0.66, "book5")]):
    box(f"shelf_book{k}", (0.45, h, 0.13), (-W + 0.32, SY + 0.05 + h / 2, bz), c, bevel=0.02, rot=(0, 0, 0 if k < 4 else 14))
    bz += 0.15
# frame / poster on the back wall
box("poster", (1.55, 1.55, 0.06), (-1.6, 3.75, -W + 0.05), "white", bevel=0.03)
plane("poster_art", 1.35, 1.35, (-1.6, 3.75, -W + 0.085), "teal")

# plants
def plant(name, x, z, scale=1.0, pot_color="pot"):
    root = empty(name, (x, 0, z))
    pot = cyl(f"{name}_pot", 0.42 * scale, 0.7 * scale, (x, 0.37 * scale + 0.08, z), pot_color, bevel=0.05, verts=32, r2=0.34 * scale, parent=root)
    cyl(f"{name}_soil", 0.36 * scale, 0.05, (x, 0.72 * scale + 0.08, z), "woodDark", bevel=0, verts=24, parent=root)
    leaves = empty(f"{name}_leaves", (x, 0.75 * scale, z), parent=root)
    for k in range(9):
        ang = k / 9 * math.pi * 2 + (0.4 if k % 2 else 0)
        L = (0.75 + (k % 3) * 0.18) * scale
        tip = (x + math.cos(ang) * L * 0.55, 0.75 * scale + L * (0.95 + (k % 2) * 0.3), z + math.sin(ang) * L * 0.55)
        mid = (x + math.cos(ang) * L * 0.3, 0.75 * scale + L * 0.7, z + math.sin(ang) * L * 0.3)
        tube(f"{name}_leaf{k}", [(x, 0.78 * scale, z), mid, tip], 0.11 * scale, "leaf" if k % 2 else "leafDark", parent=leaves, res=8, taper=[0.35, 1.0, 0.05])
    return root
plant("plant", -4.1, 4.0, 1.25)
plant("plant_small", 4.3, -3.95 + 2.6, 0.7, "teal")

# ================================================================== cats
# Chibi sitting cat, after Gatto's mascot sheet: big round head wider than the
# body, dot eyes, tiny "w" mouth, pink cheeks, straight front legs with bean
# paws, a tail that curls like a music note (awake) or wraps the paws (asleep).
def apply_mods(o):
    for ob in bpy.context.selected_objects:
        ob.select_set(False)
    bpy.context.view_layer.objects.active = o
    o.select_set(True)
    for m in list(o.modifiers):
        bpy.ops.object.modifier_apply(modifier=m.name)

def front(obj, x, y, back=0.0):
    """Front surface point (three.js coords) of obj at (x, y), ray cast along -z."""
    ok, loc, nrm, _ = obj.ray_cast(P(x, y, 5), Vector((0, 1, 0)))
    if not ok:
        return None
    return (loc.x, loc.z, -loc.y - back)

def side(obj, x, y, z, dirx):
    """Surface point hit from the side (dirx = +1 from the left, -1 from the right)."""
    ok, loc, nrm, _ = obj.ray_cast(P(x - dirx * 5, y, z), Vector((dirx, 0, 0)))
    return (loc.x, loc.z, -loc.y) if ok else (x, y, z)

def reparent(objs, parent):
    bpy.context.view_layer.update()
    for o in objs:
        mw = o.matrix_world.copy()
        o.parent = parent
        o.matrix_world = mw

def chibi(prefix, base, dark, line_dark, accent=None, phones=False, inner="nekoInner", whisk="whisk"):
    """Built at the origin facing +z; returns the root empty."""
    made_before = set(COL.objects)
    # body: a sitting cat seen in 3D — narrow chest, wide haunches at the back
    body = blob(f"{prefix}_body", [
        ((0, 0.36, -0.08), 0.66, (1.08, 0.72, 0.92)),
        ((0, 0.82, 0.02), 0.46, (0.92, 0.9, 0.82)),
        ((-0.4, 0.3, -0.14), 0.42, (0.8, 0.92, 1.12)),
        ((0.4, 0.3, -0.14), 0.42, (0.8, 0.92, 1.12)),
    ], base)
    apply_mods(body)
    # front legs (mostly inside the body, the outline draws them like the two lines of
    # the drawing), bean paws in front, back feet peeking out at the sides
    legs = []
    for sx in (-1, 1):
        legs.append(sphere(f"{prefix}_leg{sx}", 0.115, (sx * 0.16, 0.36, 0.34), base, scale=(0.95, 2.6, 1.0), seg=24))
        legs.append(sphere(f"{prefix}_paw{sx}", 0.125, (sx * 0.17, 0.08, 0.47), base, scale=(1.05, 0.62, 1.15), seg=20))
        legs.append(sphere(f"{prefix}_foot{sx}", 0.14, (sx * 0.52, 0.08, 0.16), base, scale=(0.9, 0.6, 1.35), rot=(0, sx * 18, 0), seg=20))
    # head: wide and round, chubby at the cheeks
    hy = 1.3
    head_mesh = blob(f"{prefix}_skull", [
        ((0, hy, 0.04), 0.8, (1.08, 0.93, 0.95)),
        ((-0.38, hy - 0.17, 0.1), 0.3, (1.0, 0.82, 0.86)),
        ((0.38, hy - 0.17, 0.1), 0.3, (1.0, 0.82, 0.86)),
    ], base, res=0.035)
    apply_mods(head_mesh)
    feat = []
    # ears: rounded triangles, a little outward
    for sx in (-1, 1):
        e = cyl(f"{prefix}_ear{sx}", 0.28, 0.48, (sx * 0.46, hy + 0.5, -0.04), base, r2=0.035, bevel=0.07, verts=24, rot=(-6, 0, -sx * 18))
        e.scale = (1.0, 0.72, 1.0)  # a bit flatter front-to-back (Blender y)
        ie = cyl(f"{prefix}_earin{sx}", 0.16, 0.27, (sx * 0.45, hy + 0.45, 0.07), inner, r2=0.02, bevel=0.04, verts=20, rot=(-6, 0, -sx * 18))
        ie.scale = (1.0, 0.3, 1.0)
        feat += [e, ie]
    # face, glued to the head surface
    for sx in (-1, 1):
        ex = sx * 0.31
        f = front(head_mesh, ex, hy + 0.0, back=0.03)
        eye = sphere(f"{prefix}_eye{sx}", 0.078, f, "eye", scale=(0.92, 1.12, 0.55), seg=18)
        hi = sphere(f"{prefix}_eyehi{sx}", 0.02, (f[0] - sx * 0.0 - 0.022, f[1] + 0.035, f[2] + 0.035), "white", seg=10)
        # closed eyes: a small arc (flipped upside down = happy eyes)
        pts = []
        for k, (dx, dy) in enumerate(((-0.085, 0.025), (0.0, -0.025), (0.085, 0.025))):
            q = front(head_mesh, ex + dx, hy + dy, back=-0.012)
            pts.append(q)
        shut = tube(f"{prefix}_eyeshut{sx}", pts, 0.017, "eye", res=6)
        # cheeks
        c = front(head_mesh, sx * 0.5, hy - 0.16, back=0.02)
        blush = sphere(f"{prefix}_blush{sx}", 0.1, c, "blush", scale=(1.25, 0.62, 0.3), rot=(0, sx * 28, 0), seg=16)
        feat += [eye, hi, shut, blush]
        # whiskers: two short strokes leaving the cheek
        for k, dy in ((0, 0.05), (1, -0.04)):
            st0 = side(head_mesh, sx * 0.3, hy - 0.12 + dy, 0.3, -sx)
            st0 = (st0[0] - sx * 0.02, st0[1], st0[2])
            w = tube(f"{prefix}_whisker{sx}{k}", [st0, (st0[0] + sx * 0.2, st0[1] + dy * 0.6 + 0.01, st0[2] - 0.02), (st0[0] + sx * 0.34, st0[1] + dy * 1.4 + 0.02, st0[2] - 0.06)], 0.0065, whisk, res=5)
            feat.append(w)
    n = front(head_mesh, 0, hy - 0.11, back=0.012)
    nose = sphere(f"{prefix}_nose", 0.042, n, "eye", scale=(1.3, 0.85, 0.6), seg=12)
    mpts = [front(head_mesh, dx, hy - 0.2 + dy, back=-0.01) for dx, dy in ((-0.1, 0.02), (-0.05, -0.025), (0, 0.01), (0.05, -0.025), (0.1, 0.02))]
    mouth = tube(f"{prefix}_mouth", mpts, 0.014, "eye", res=5)
    feat += [nose, mouth]
    if accent == "bow":
        for sx in (-1, 1):
            feat.append(sphere(f"{prefix}_bow{sx}", 0.13, (0.42 + sx * 0.14, hy + 0.5, 0.25), "teal", scale=(1.25, 0.85, 0.6), rot=(0, 0, sx * 20), seg=16))
        feat.append(sphere(f"{prefix}_bowk", 0.065, (0.42, hy + 0.5, 0.3), "tealDark", seg=12))
    # tails: one curled up like a note (awake), one wrapped round the paws (asleep)
    up = tube(f"{prefix}_tailup", [(0.42, 0.26, -0.42), (0.84, 0.3, -0.3), (1.0, 0.62, -0.18), (0.96, 0.95, -0.12), (0.78, 1.06, -0.08), (0.64, 0.93, -0.05), (0.73, 0.82, -0.04)], 0.1, base, res=10, taper=[1, 1, 0.95, 0.9, 0.85, 0.82, 0.8])
    upt = sphere(f"{prefix}_tailuptip", 0.095, (0.73, 0.82, -0.04), dark, seg=16)
    wrap = tube(f"{prefix}_tailwrap", [(0.42, 0.18, -0.42), (0.82, 0.13, -0.05), (0.66, 0.11, 0.52), (0.2, 0.1, 0.78), (-0.25, 0.1, 0.72)], 0.1, base, res=10, taper=[1, 1, 0.95, 0.9, 0.85])
    wrapt = sphere(f"{prefix}_tailwraptip", 0.095, (-0.25, 0.1, 0.72), dark, seg=16)
    root = empty(prefix, (0, 0, 0))
    head = empty(f"{prefix}_head", (0, hy - 0.45, 0.0), parent=root)
    reparent([head_mesh] + feat, head)
    tail_up = empty(f"{prefix}_tail_up", (0.42, 0.28, -0.42), parent=root)
    reparent([up, upt], tail_up)
    tail_wrap = empty(f"{prefix}_tail_wrap", (0.42, 0.18, -0.42), parent=root)
    reparent([wrap, wrapt], tail_wrap)
    if phones:
        ph = empty(f"{prefix}_phones", (0, hy, 0), parent=head)
        band = tube(f"{prefix}_phones_band", [(-0.9, hy + 0.0, -0.06), (-0.78, hy + 0.55, -0.16), (0, hy + 0.9, -0.22), (0.78, hy + 0.55, -0.16), (0.9, hy + 0.0, -0.06)], 0.07, "phones", res=10)
        parts = [band]
        for sx in (-1, 1):
            parts.append(cyl(f"{prefix}_phones_cup{sx}", 0.27, 0.2, (sx * 0.9, hy - 0.06, -0.02), "phones", rot=(0, 0, 90), bevel=0.07, verts=32))
            parts.append(cyl(f"{prefix}_phones_pad{sx}", 0.2, 0.06, (sx * 1.02, hy - 0.06, -0.02), "phonesPad", rot=(0, 0, 90), bevel=0.03, verts=32))
        reparent(parts, ph)
    # everything else of this cat under the root
    rest = [o for o in COL.objects if o not in made_before and o.parent is None and o is not root]
    reparent(rest, root)
    return root

def place(root, x, z, yaw, scale=1.0):
    root.location = P(x, 0, z)
    root.rotation_euler = R(0, yaw, 0)
    root.scale = (scale, scale, scale)
    bpy.context.view_layer.update()

# Neko on his cushion, turned towards the camera
cyl("neko_cushion", 1.6, 0.32, (-0.2, 0.32, 0.55), "cushion", bevel=0.14, verts=48)
cyl("neko_cushion_top", 1.3, 0.1, (-0.2, 0.47, 0.55), "cushion2", bevel=0.05, verts=48)
# Neko and Luna are drawn (2D, like the mascot in the app) by the site itself.
# Lucky "statue" on the shelf: an acrylic stand of Neko (the print is added by the site).
stat = empty("statue", (-W + 0.42, SY + 0.05, SZ + 0.55))
sbase = box("stand_base", (0.26, 0.06, 0.5), (-W + 0.42, SY + 0.08, SZ + 0.55), "white", bevel=0.025)
splate = box("stand_plate", (0.025, 0.66, 0.56), (-W + 0.42, SY + 0.44, SZ + 0.55), "glass", bevel=0.01)
reparent([sbase, splate], stat)

# ================================================================== export
for o in COL.objects:
    o.select_set(True)
bpy.ops.export_scene.gltf(
    filepath=OUT,
    export_format="GLB",
    use_selection=False,
    export_apply=True,
    export_yup=True,
    export_materials="EXPORT",
    export_normals=True,
    export_texcoords=True,
    export_draco_mesh_compression_enable=True,
    export_draco_mesh_compression_level=7,
)
tris = 0
dg = bpy.context.evaluated_depsgraph_get()
for o in COL.objects:
    if o.type == "MESH":
        ev = o.evaluated_get(dg)
        me = ev.to_mesh()
        me.calc_loop_triangles()
        tris += len(me.loop_triangles)
        ev.to_mesh_clear()
print("TRIS", tris, "OBJECTS", len(COL.objects))
