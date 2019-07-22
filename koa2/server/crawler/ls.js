const puppeteer = require("puppeteer-core");
const fs=require('fs')

// const ticket=`5FF15E118-892B-DE65-18D3-3D568538B5E0`
// const ticket=`2F0A4546D-DF92-3A98-5FDA-AC73DBA440C6`
const ticket=`934E22B2E-EE6F-BF5E-20A6-6736765AA9FB`


// const main_url=`http://mtest.ilaisa.com`
const main_url=`http://m.ilaisa.com`
// const blog_detail_url=`http://mtest.ilaisa.com/#/blogDetail/`
const blog_detail_url=`http://m.ilaisa.com/#/blogDetail/`
const crytoTicket= Buffer.from(ticket).toString('base64');
const request_url=`${main_url}?ticket=${crytoTicket}`


;(async ()=>{
    const browser = await puppeteer.launch({
        headless:false,
		devtools:true,
        executablePath:'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
		
		// executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
    });
    const page = await browser.newPage();
    // await page.setRequestInterception(true)
    await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1')
	await page.setViewport({
		width :414,
		height:716,
		isMobile:true,
		hasTouch:true
    })
	await page.setJavaScriptEnabled(true);
	await page.setGeolocation({latitude:22.572123 , longitude: 114.108346});
	//当前账号未领取的blog_data id
	var blog_data=[];
	//查询领取红包id
	var redpacket_id=''
	var reload_flag=false;
    await page.on('requestfinished', request => {
		if(request.resourceType() == "xhr"){
			(async () => {
				// try {
					// 获取数据并转为json格式
					let res = await request.response();
					let result = await res.json();
					let res_data = result.data;
					if(request.postData().includes('laishang_index')){
						res_data.blog_data.forEach(item=>{
							if(item.is_receive==0&&item.is_vote==0){
								blog_data.push({
									blog_id:item.blog_id,
									read_time:Number(item.read_time)
								})
							}
						}) 
						console.log('blog_data.length===========>'+blog_data.length)
						reload_flag=blog_data.length==0         
					}
					if(request.postData().includes('blog_redpacket_receive')){
						redpacket_id=res_data.redpacket_id;
						console.log('redpacket_id==========>'+redpacket_id)
					}
					if(request.postData().includes('laishang_redpacket_detail')&&request.postData().includes(redpacket_id)){
						let  data=`redpacket_id${redpacket_id}===领取金额${res_data.source_redpacket.actual_money}\n`
						await fs.appendFile('reveiveInfo.txt',data,(err)=>{
							if(!err){

							}else{
								console.log('写入失败')
							}
						})
						console.log(`redpacket_id===领取金额${res_data.source_redpacket.actual_money}`)
					}
				// } catch (error) {
				// 	console.log('获取数据出错')
				// }
			})();
		}
        
	})
	var  receive_index=0;
	const receive_packet=async ()=>{
		
		await page.goto(request_url,{waitUntil:'networkidle0'});
		console.log('进入来赏主页')
		console.log(reload_flag)
		while (blog_data.length<=0) {
			await page.evaluate((reload_flag)=>{
				window.scrollTo(0, document.querySelector('.van-list').getBoundingClientRect().height);
				return 
			},reload_flag)
		}
		// await result;
		console.log(blog_data)
		await page.waitFor(2500);
		console.log('进入的id=========?'+blog_data[0].blog_id)
		await page.goto(`${blog_detail_url}${blog_data[0].blog_id}`,{waitUntil:'networkidle0'});
		await page.evaluate(()=>{
			let t=document.getElementById('commentTitle')
			let height=t.offsetTop + t.offsetHeight / 2
			window.scrollTo(0, height);
		})
		//等待红包领取时间 加了100毫秒
		await page.waitFor(blog_data[0].read_time*1000+100)
		const envelopBtn=await page.waitForSelector('.envelop-btn');
		const receiveSuccess=page.waitForNavigation()
		const click=await envelopBtn.click()
		await receiveSuccess
		console.log('领取成功')
		await receive_index++;
		blog_data=[]
		await page.waitFor(2500);
		receive_index<=30?receive_packet():''
	}
    receive_packet()
	// await page.goto(request_url,{waitUntil:'networkidle0'});
    // browser.close()
	
})()