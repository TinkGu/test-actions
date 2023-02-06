import axios from 'axios';

const argv = process.argv.slice(2);
const getArg = (key: string) =>
  argv.find((x) => x.indexOf(`--${key}=`) !== -1)?.split(`--${key}=`)[1];
const webhook = getArg('webhook');

let now = new Date();
now.setHours(now.getHours() + 8);
const padZero = (x: any) => ('' + x).padStart(2, '0');
const format = (d: Date) =>
  `${padZero(d.getMonth() + 1)}-${padZero(d.getDate())}`;
const nowstr = format(now);
console.log(nowstr);

/** 推送给机器人 */
async function pushToBot(msg: string) {
  if (!webhook) {
    return;
  }

  await axios.post(webhook, {
    msg_type: 'text',
    content: {
      text: `[干饭 bot 🍚]: <at user_id="all">所有人</at>  ${msg}`,
    },
  });
}

function isInvalidDate() {
  const whiteDays = [
    '01-01',
    '05-01',
    '05-02',
    '05-03',
    '10-01',
    '10-02',
    '10-03',
    '10-04',
    '10-05',
  ];
  return whiteDays.some((x) => x === nowstr);
}

const wordList = [
  '你订饭了吗',
  '让我看看是谁还没有订饭',
  '上次有人没点饭，后来我看到他哭晕在厕所 😭',
  '该吃点未来的饭了',
  '发来一个订饭邀请',
  '多年以后，面对财报，李斌将会偷偷想起你没点饭的那个下午',
  '活是干不完的，吃口饭先',
  '订饭吧，文档里只有「抓手」没有手抓饭',
  '你知不知道，你少订一份饭会给公司省多少钱啊，未来不允许有这样的事情发生',
  '今天，你还没订饭。也许是昨天，我不知道。',
  '幸福的同事群都是订了饭的，不幸的同事群各有各的不幸',
  '我已经老了，有一天，有一个男人向我走来，他对我说，你今天还没有订饭',
  '神说，要有饭，就订了饭',
  '哪里有天才，我只不过是把别人订饭的时间都用在工作上了。',
  '不在沉默中爆发，就在沉默中订饭。',
  '全体目光向我看齐，看我看我，我宣布一件事，你还没订饭',
  '干饭 Bot 最喜欢的城市是米来，其次是爱订堡',
  '没时间解释了，快订饭',
  '不会吧不会吧，这个群里不会还有人没订饭吧，李斌都要笑死了 🤣',
  '再不订饭就没有水果了啊',
];

if (!isInvalidDate()) {
  let msg =
    wordList[Math.floor(Math.random() * wordList.length)] || wordList[0];
  if (nowstr === '02-14') {
    msg = '快订饭吧，情人节你也要 9 点下班不是吗';
  }
  if (nowstr === '12-31') {
    msg = '2023 年本群十大热词，第一居然是订饭';
  }
  console.log(msg);
  pushToBot(msg);
}
