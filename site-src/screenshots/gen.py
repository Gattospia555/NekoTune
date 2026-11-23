import asyncio, json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path="/usr/bin/google-chrome")
        pg = await b.new_page()
        await pg.goto("file:///home/claude/appshot/mock/covers.html")
        out = await pg.evaluate("window.out")
        json.dump(out, open("art.json","w"))
        print(len(out["covers"]), sum(len(c) for c in out["covers"])//1024, "KB")
        await b.close()
asyncio.run(main())
