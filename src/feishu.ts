import axios from 'axios';

const argv = process.argv.slice(2);
const getArg = (key: string) =>
  argv.find((x) => x.indexOf(`--${key}=`) !== -1)?.split(`--${key}=`)[1];
const webhook = getArg('webhook');

let now = new Date();
now.setHours(now.getHours() + 8);

/** 推送给机器人 */
async function pushToBot(msg: string) {
  if (!webhook) {
    return;
  }

  await axios.post(webhook, {
    msg_type: 'text',
    content: {
      text: `[干饭 bot 🍚]: ${msg}`,
    },
  });
}

function isInvalidDate() {
  const padZero = (x: any) => ('' + x).padStart(2, '0');
  const format = (d: Date) =>
    `${padZero(d.getMonth() + 1)}-${padZero(d.getDate())}`;
  const nowstr = format(now);
  console.log(nowstr);
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
];

if (!isInvalidDate()) {
  const msg =
    wordList[Math.floor(Math.random() * wordList.length)] || wordList[0];
  console.log(msg);
  pushToBot(msg);
}
