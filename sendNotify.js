// 推送消息
const { request } = require('./utils');
const nodemailer = require('nodemailer');

// 微信server酱SEND_KEY
const WX_SEND_KEY = process.env.WX_SEND_KEY || '';
// 邮件相关配置
const SEND_EMAIL = process.env.SEND_EMAIL;
const RECEIVE_EMAIL = process.env.RECEIVE_EMAIL;
const SEND_EMAIL_PASS = process.env.SEND_EMAIL_PASS;

async function sendNotify(title, desp) {
  //可提供多种通知
  await serverNotify(title, desp);
  await emailNotify(title, desp);
}

// =======================================微信server酱通知===========================================
//此处填你申请的SEND_KEY.
//注：此处设置github action用户填写到Settings-Secrets里面(Name输入WX_SEND_KEY)
async function serverNotify(title = '', desp = '') {
  try {
    const url = `https://sctapi.ftqq.com/${WX_SEND_KEY}.send?title=${encodeURI(title)}&desp=${encodeURI(desp)}`;
    const res = await request('get', url);
    console.log('mp send success', res)
  } catch (e) {
    console.error('mp send fail',e);
  }
}

// =======================================邮件通知===========================================
async function emailNotify(title = '', desp = '') {
  let transporter = nodemailer.createTransport({
    host: 'smtp.126.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: SEND_EMAIL, // generated ethereal user
      pass: SEND_EMAIL_PASS, // generated ethereal password
    },
  });

  let mailOptions = {
    from: SEND_EMAIL,
    to: RECEIVE_EMAIL,
    subject: title,
    text: desp,
  };

  function mailCallback(error, info) {
    if (error) {
      return console.log('email send fail',error);
    }
    console.log('email send success: ' + info.response);
  }

  transporter.sendMail(mailOptions, mailCallback);
}

module.exports = {
  sendNotify,
};
