import axios from 'axios';
import crypto from 'crypto';

const argv = process.argv.slice(2);
const getArg = (key: string) =>
  argv.find((x) => x.indexOf(`--${key}=`) !== -1)?.split(`--${key}=`)[1];
const webhook = getArg('webhook');
const srcret = getArg('secret');

/** 推送给机器人 */
async function pushToBot(msg: string) {
  if (!srcret || !webhook) {
    return;
  }
  const timestamp = Date.now();
  const sign = crypto
    .createHmac('sha256', srcret)
    .update(`${timestamp}\n${srcret}`)
    .digest('base64');

  await axios.post(`${webhook}&timestamp=${timestamp}&sign=${sign}`, {
    msgtype: 'markdown',
    markdown: {
      title: 'hello',
      text: msg || '',
    },
    at: {
      isAtAll: false,
    },
  });
}

pushToBot('hello');
