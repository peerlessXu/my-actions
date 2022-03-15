// version v0.0.1
// create by xyfei

const {sendNotify} = require('../sendNotify')

// 公共变量
const KEY = process.env.SMZDM_COOKIE
const USER = process.env.SMZDM_USER
const PASS = process.env.SMZDM_PASS
const SEND_KEY = process.env.SEND_KEY

sendNotify('值得买签到','恭喜签到成功')