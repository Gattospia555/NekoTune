import os, asyncio
FP = "/home/claude/fontpkgs/node_modules"
FONTS = {
  "Inter": [(w, f"{FP}/@fontsource/inter/files/inter-latin-{w}-normal.woff2") for w in (300,400,500,600,700,800,900)],
  "Nunito": [(w, f"{FP}/@fontsource/nunito/files/nunito-latin-{w}-normal.woff2") for w in (400,600,700,800,900)],
  "Quicksand": [(w, f"{FP}/@fontsource/quicksand/files/quicksand-latin-{w}-normal.woff2") for w in (400,500,600,700)],
  "Fredoka": [(w, f"{FP}/@fontsource/fredoka/files/fredoka-latin-{w}-normal.woff2") for w in (500,600)],
}
SYM = f"{FP}/material-symbols/material-symbols-rounded.woff2"
def css():
    out = []
    for fam, files in FONTS.items():
        for w, path in files:
            if os.path.exists(path):
                out.append(f"@font-face{{font-family:'{fam}';font-style:normal;font-weight:{w};font-display:block;src:url(https://fonts.gstatic.com/local/{os.path.basename(path)}) format('woff2');}}")
    out.append("@font-face{font-family:'Material Symbols Rounded';font-style:normal;font-weight:100 700;font-display:block;src:url(https://fonts.gstatic.com/local/material-symbols-rounded.woff2) format('woff2');}")
    out.append(".material-symbols-rounded{font-family:'Material Symbols Rounded';font-weight:normal;font-style:normal;line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:'liga';-webkit-font-smoothing:antialiased;}")
    return "\n".join(out)
PATHS = {os.path.basename(p): p for files in FONTS.values() for _, p in files}
PATHS["material-symbols-rounded.woff2"] = SYM
ART = open("/home/claude/appshot/mock/art.js").read()
MOCK = open("/home/claude/appshot/mock/mock.js").read()

async def setup(ctx):
    async def gcss(route):
        await route.fulfill(status=200, content_type="text/css", body=css())
    async def gfont(route):
        name = route.request.url.rsplit("/", 1)[-1]
        p = PATHS.get(name)
        if p: await route.fulfill(status=200, content_type="font/woff2", body=open(p, "rb").read())
        else: await route.fulfill(status=404, body="")
    async def block(route):
        await route.fulfill(status=404, body="")
    await ctx.route("https://fonts.googleapis.com/**", gcss)
    await ctx.route("https://fonts.gstatic.com/**", gfont)
    await ctx.route(lambda u: u.startswith("http") and "localhost" not in u and "fonts.g" not in u, block)
    await ctx.add_init_script(ART)
    await ctx.add_init_script(MOCK)

ARGS = ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--autoplay-policy=no-user-gesture-required", "--force-color-profile=srgb"]
