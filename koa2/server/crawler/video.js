const base =`https://movie.douban.com/subject/`
const doubanid=`26584183`
// const video=`https://movie.douban.com/trailer/244061/#content`
const puppeteer =require('puppeteer')
;(async ()=>{
    console.log('strat visti target page')
    const browser=await puppeteer.launch({
        args:['--no-sandbox'],
        dumpio:false,
        // executablePath:'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        executablePath:'C:\\Users\\dell\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
        headless:false
    })
    const page=await browser.newPage();
    await page.goto(base+doubanid,{
        waitUntil:'networkidle0'
    })
    await page.waitFor(1000)
	
    const result=await page.evaluate(()=>{
        var $=window.$;
        var items=$('.related-pic-video');
        if(items&&items.length>0){
            var link=items.attr('href')
            var cover=items.css('background-image').split("(")[1].split(")")[0];
            return {
                link,cover
            }
        }
        
        return {}
    })
    var video;
    if(result.link){
        await page.goto(result.link,{
            waitUntil:'networkidle0'
        })
        await page.waitFor(1000)
        video=await page.evaluate(()=>{
            var $=window.$;
            var items=$('source');
            if(items&&items.length>0){
                var link=items.attr('src')
                return link
            }
            
            return ''
        })
    }
    const data={
        video,
        doubanid,
        cover:result.cover
    }
    browser.close()
    process.send({data})
    process.exit(0)
})()