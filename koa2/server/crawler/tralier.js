const url =`https://movie.douban.com/tag/#/?sort=R&range=6,10&tags=%E7%94%B5%E5%BD%B1,%E6%BE%B3%E5%A4%A7%E5%88%A9%E4%BA%9A`
const puppeteer =require('puppeteer-core')
;(async ()=>{
    console.log('strat visti target page')
    const browser=await puppeteer.launch({
        args:['--no-sandbox'],
        dumpio:false,
        executablePath:'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        // executablePath:'C:\\Users\\dell\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
        headless:false
    })
    const page=await browser.newPage();
    await page.goto(url,{
        waitUntil:'networkidle0'
    })
    await page.waitFor(2500)
    const more=await page.waitForSelector('.more')
	for(var i=0;i<3;i++){
		more.click()
		await page.waitFor(2500)
	}
    const result=await page.evaluate(()=>{
        var links=[]
        var $=window.$;
        var items=$('.list-wp a');
        if(items.length>0){
            items.each((index,item)=>{
                var it=$(item)
                var doubanId=it.find('.cover-wp').data('id')
                var title=it.find('.title').text()
                var rate=Number(it.find('.rate').text())
                var img=it.find('img').attr('src').replace('s_ratio','l_ratio')
                
                links.push({
                    doubanId,title,rate,img
                })
            }) 
        }
        return Promise.resolve(links)
    })
    browser.close()
    process.send({result})
    process.exit(0)
})()