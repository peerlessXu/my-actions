// version v0.0.1
// create by xyfei

const { sendNotify } = require('../sendNotify')
const { request, getRandom } = require('../utils');
const dayjs = require('dayjs')

// 公共变量
const SMZDM_COOKIE = process.env.SMZDM_COOKIE
const SMZDM_USER = process.env.SMZDM_USER


/**
 * 什么值得买签到  
 * @param {} 
 */
let smzdmSign = async () => {
	let referer = 'http://www.smzdm.com/qiandao/';
	let url = 'https://zhiyou.smzdm.com/user/checkin/jsonp_checkin?callback=jQuery112409568846254764496_' + new Date().getTime() + '&_=' + new Date().getTime()
	try {
		const { data } = await request('get', url, { cookie: SMZDM_COOKIE, referer })
		console.log('sign data===', data);
		if (data.indexOf('"error_code":0') != -1) {
			console.log(dayjs().format("YYYY-MM-DD HH:mm:ss") + ' -- 什么值得买 签到成功!!!!');
			//记录签到日志
			sendNotify('什么值得买【签到成功】', `
			时间: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}  
			用户: ${SMZDM_USER} 
			内容: ${data}
			`);
		} else {
			//发邮件
			sendNotify('什么值得买【签到报错】', `
			时间: ${dayjs().format("YYYY-MM-DD HH:mm:ss")} 
			用户: ${SMZDM_USER} 
			错误内容: ${data}`);
		}
	} catch (e) {
		console.log(e);
		//发邮件
		sendNotify('什么值得买【签到报错】', `
		时间: ${dayjs().format("YYYY-MM-DD HH:mm:ss")}  
		用户: ${SMZDM_USER} 
		错误内容: ${e}`);
	}

}

//延迟执行签到
let setTimeSmzdmSign = (min, max) => {
	let delay = getRandom(min, max)
	setTimeout(() => {
		//签到
		smzdmSign();
		console.log('签到！！');
	}, delay);
}

setTimeSmzdmSign(10000, 300000)


// sendNotify('值得买签到', '恭喜签到成功')