import asyncio, sys, shutil, os
from playwright.async_api import async_playwright
from harness import setup, ARGS
W,H = 1440, 900
A = "window.nekotune"
async def boot(b, name):
    ctx = await b.new_context(viewport={"width":W,"height":H}, locale="it-IT", timezone_id="Europe/Rome", record_video_dir=f"vid/{name}", record_video_size={"width":W,"height":H})
    await setup(ctx)
    pg = await ctx.new_page()
    await pg.goto("http://localhost:5174/", wait_until="networkidle")
    await pg.wait_for_timeout(3000)
    await pg.evaluate(f"{A}.profileManager.loadFriends().then(()=>{A}.dm.renderConversations?.())")
    return ctx, pg

async def listen(b):
    ctx, pg = await boot(b, "listen")
    await pg.mouse.move(700, 450)
    await pg.wait_for_timeout(700)
    cards = await pg.query_selector_all("#recently-played-grid .card")
    box = await cards[1].bounding_box()
    await pg.mouse.move(box["x"]+box["width"]/2, box["y"]+box["height"]/2, steps=25)
    await pg.wait_for_timeout(900)
    await pg.mouse.click(box["x"]+box["width"]/2, box["y"]+box["height"]/2)
    await pg.wait_for_timeout(1800)
    pb = await (await pg.query_selector("#player-cover")).bounding_box()
    await pg.mouse.move(pb["x"]+pb["width"]/2, pb["y"]+pb["height"]/2, steps=25)
    await pg.wait_for_timeout(300)
    await pg.evaluate(f"{A}.player.toggleExpandedPlayer()")
    await pg.wait_for_timeout(2200)
    lb = await (await pg.query_selector("#btn-expanded-lyrics")).bounding_box()
    await pg.mouse.move(lb["x"]+lb["width"]/2, lb["y"]+lb["height"]/2, steps=25)
    await pg.wait_for_timeout(300)
    await pg.click("#btn-expanded-lyrics")
    await pg.wait_for_timeout(5500)
    await ctx.close()

async def friends(b):
    ctx, pg = await boot(b, "friends")
    await pg.evaluate(f"{A}.navigateTo('messages')")
    await pg.wait_for_timeout(1200)
    conv = await pg.query_selector(".msg-conv[data-id='6f1c2a10-0000-4000-8000-000000000002']")
    cb = await conv.bounding_box()
    await pg.mouse.move(cb["x"]+cb["width"]/2, cb["y"]+cb["height"]/2, steps=25)
    await pg.wait_for_timeout(400)
    await conv.click()
    await pg.wait_for_timeout(2000)
    await pg.click("#dm-input")
    await pg.keyboard.type("arrivo! metto le cuffie", delay=70)
    await pg.wait_for_timeout(500)
    await pg.keyboard.press("Enter")
    await pg.wait_for_timeout(1500)
    await pg.evaluate(f"{A}.dm.showRemoteTyping(true)")
    await pg.wait_for_timeout(1800)
    await pg.evaluate(f"""(()=>{{const d={A}.dm; const m={{id:'mz1',sender_id:'6f1c2a10-0000-4000-8000-000000000002',receiver_id:'6f1c2a10-0000-4000-8000-000000000001',content:'ti aspetto, parte Polvere di stelle',type:'text',metadata:{{}},read:false,reactions:{{}},created_at:new Date().toISOString()}};
      d.showRemoteTyping(false); d.messages.set(m.id,m); d.upsert(m); d.noteMessage && d.noteMessage(m); }})()""")
    await pg.wait_for_timeout(3500)
    await ctx.close()

async def main():
    which = sys.argv[1:] or ["listen","friends"]
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome", args=ARGS)
        for w in which:
            shutil.rmtree(f"vid/{w}", ignore_errors=True)
            await {"listen":listen,"friends":friends}[w](b)
            f = os.listdir(f"vid/{w}")[0]
            shutil.move(f"vid/{w}/{f}", f"vid/{w}.webm")
            print(w, os.path.getsize(f"vid/{w}.webm"))
        await b.close()
asyncio.run(main())
