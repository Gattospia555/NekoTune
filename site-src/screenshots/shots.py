import asyncio, sys
from playwright.async_api import async_playwright
from harness import setup, ARGS
W,H = 1440, 900
async def main():
    which = sys.argv[1:] or ["all"]
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=ARGS)
        ctx = await b.new_context(viewport={"width":W,"height":H}, locale="it-IT", timezone_id="Europe/Rome", device_scale_factor=2)
        await setup(ctx)
        pg = await ctx.new_page()
        errs=[]; pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.goto("http://localhost:5174/", wait_until="networkidle")
        await pg.wait_for_timeout(3500)
        A = "window.nekotune"
        async def snap(name, wait=1500):
            await pg.wait_for_timeout(wait)
            await pg.screenshot(path=f"out/{name}.png")
        # play a track
        await pg.evaluate(f"(()=>{{const T=window.__DEMO.TRACKS; {A}.player.playTrackList([T[16],T[0],T[3],T[11],T[8]],0);}})()")
        await pg.wait_for_timeout(2500)
        await snap("home")
        await pg.evaluate(f"{A}.player.toggleExpandedPlayer()")
        await snap("expanded", 2200)
        await pg.click("#btn-expanded-lyrics")
        await snap("expanded-lyrics", 2500)
        await pg.evaluate(f"{A}.player.toggleExpandedPlayer()")
        await pg.wait_for_timeout(800)
        await pg.evaluate(f"{A}.profileManager.loadFriends().then(()=>{A}.dm.renderConversations?.())")
        await pg.evaluate(f"{A}.navigateTo('messages')")
        await pg.wait_for_timeout(1500)
        await pg.evaluate(f"{A}.dm.open('6f1c2a10-0000-4000-8000-000000000002','Luna')")
        await snap("messages", 2500)
        await pg.evaluate(f"{A}.playlists.showPlaylistDetail('pl_sera')")
        await snap("playlist", 2000)
        await pg.evaluate(f"{A}.navigateTo('themes')")
        await snap("themes", 2000)
        await pg.evaluate(f"{A}.themes.applyTheme('nekotune-dark')")
        await pg.evaluate(f"{A}.navigateTo('home')")
        await snap("home-dark", 2500)
        await pg.evaluate(f"{A}.playlists.showPlaylistDetail('pl_studio')")
        await snap("playlist-dark", 2000)
        print("errors:", errs[:10])
        await b.close()
asyncio.run(main())
