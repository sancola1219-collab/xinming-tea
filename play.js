// ===== 一起玩：泡茶计时器、你适合哪杯茶、看茶叶猜茶名 =====
// 用到 main.js 里的 $（取元素）和 tx（繁简转换）

// 一般的盖碗泡法（110 毫升盖碗），秒数是每一泡的浸泡时间
const BREW = [
  { id: 'maofeng', name: '黄山毛峰', img: 'maofeng-leaves', gram: '3 克', temp: '85℃，水开后放凉一下', prep: '不用洗茶，温杯后直接泡', secs: [20, 25, 35, 50],
    tip: '绿茶怕烫，水太热会苦。看芽叶一根根立起来，就是最好看的时候。' },
  { id: 'tieguanyin', name: '铁观音', img: 'tieguanyin', gram: '7 克', temp: '100℃ 沸水', prep: '先用沸水快冲一遍倒掉，把茶叶叫醒', secs: [25, 20, 25, 35, 45, 60],
    tip: '第一泡让颗粒慢慢打开，盖子掀起来闻一下，兰花香就在盖子上。' },
  { id: 'yancha', name: '武夷岩茶', img: 'rougui-leaves', gram: '8 克', temp: '100℃ 沸水', prep: '盖碗先烫热，快冲一遍倒掉', secs: [10, 10, 15, 20, 30, 45, 60],
    tip: '岩茶要快进快出，前几泡别闷太久，焙火香才不会变成苦。' },
  { id: 'baicha', name: '老白茶', img: 'whitetea-leaves', gram: '5 克', temp: '100℃ 沸水', prep: '快冲一遍倒掉', secs: [20, 20, 30, 40, 60],
    tip: '泡到没味道也别丢，丢进壶里煮一煮，又是一壶枣香。' },
  { id: 'liubao', name: '陈年六堡', img: 'liubao-leaves', gram: '8 克', temp: '100℃ 沸水', prep: '快冲两遍倒掉，把陈味洗开', secs: [10, 10, 15, 20, 30, 45],
    tip: '汤色红浓才对味，冬天我喜欢泡完再煮，满屋子都暖。' },
  { id: 'hongcha', name: '红茶', img: 'gaiwan-red', gram: '4 克', temp: '90℃ 左右', prep: '不用洗茶，温杯后直接泡', secs: [10, 10, 15, 20, 30],
    tip: '红茶出汤要快，闷久了会涩。第一次喝茶的朋友，我都先泡这个。' },
];

const R = 88, CIRC = 2 * Math.PI * R;
const brew = { tea: BREW[0], round: 0, left: 0, endAt: 0, running: false, done: false, timer: null };
const fg = $('ring-fg');
fg.style.strokeDasharray = CIRC;

function chime() {
  try {
    const ac = chime.ac || (chime.ac = new (window.AudioContext || window.webkitAudioContext)());
    [[880, 0], [1318.5, .28], [1760, .56]].forEach(([f, t]) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = 'sine'; o.frequency.value = f;
      g.gain.setValueAtTime(0, ac.currentTime + t); g.gain.linearRampToValueAtTime(.22, ac.currentTime + t + .02); g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + t + 1.2);
      o.connect(g).connect(ac.destination); o.start(ac.currentTime + t); o.stop(ac.currentTime + t + 1.3);
    });
  } catch (e) {}
  if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
}

function brewDraw() {
  const t = brew.tea, total = t.secs[brew.round], last = brew.round === t.secs.length - 1;
  $('brew-round').textContent = tx(`第 ${brew.round + 1} 泡`);
  $('brew-sec').textContent = brew.done ? tx('出汤') : Math.ceil(brew.left);
  $('brew-state').textContent = tx(brew.done ? (last ? '这壶泡完了' : '倒出来，趁热喝') : brew.running ? '闷着，别急' : '秒');
  fg.style.strokeDashoffset = CIRC * (brew.done ? 0 : brew.left / total);
  $('brew').classList.toggle('done', brew.done);
  $('brew-go').textContent = tx(brew.done ? (last ? '再来一壶' : '泡下一泡') : brew.running ? '暂停' : brew.left < total ? '继续' : '开始');
  $('brew-next').disabled = last;
  [...$('brew-steps').children].forEach((s, i) => { s.className = i < brew.round || (i === brew.round && brew.done) ? 'past' : i === brew.round ? 'now' : ''; });
}
function brewInfo() {
  const t = brew.tea;
  $('brew-gram').textContent = tx(t.gram + '（110 毫升盖碗）');
  $('brew-temp').textContent = tx(t.temp);
  $('brew-prep').textContent = tx(t.prep);
  $('brew-tip').textContent = tx('昕茗说：' + t.tip);
  $('brew-steps').innerHTML = t.secs.map((s, i) => `<span><b>${i + 1}</b>${s}″</span>`).join('');
  [...$('brew-teas').children].forEach(b => b.classList.toggle('on', b.dataset.id === t.id));
}
function brewStop() { clearInterval(brew.timer); brew.running = false; }
function brewSet(round) { brewStop(); brew.round = round; brew.left = brew.tea.secs[round]; brew.done = false; brewDraw(); }
function brewPick(id) { brew.tea = BREW.find(t => t.id === id); brewInfo(); brewSet(0); }
function brewStart() {
  brew.running = true; brew.endAt = Date.now() + brew.left * 1000;
  brew.timer = setInterval(() => {
    brew.left = Math.max(0, (brew.endAt - Date.now()) / 1000);
    if (brew.left <= 0) { brewStop(); brew.done = true; chime(); }
    brewDraw();
  }, 100);
  brewDraw();
}
$('brew-teas').innerHTML = BREW.map(t => `<button type="button" data-id="${t.id}">${t.name}</button>`).join('');
$('brew-teas').onclick = e => { const b = e.target.closest('button'); if (b) brewPick(b.dataset.id); };
$('brew-go').onclick = () => {
  if (brew.done) { const last = brew.round === brew.tea.secs.length - 1; brewSet(last ? 0 : brew.round + 1); if (!last) brewStart(); }
  else if (brew.running) { brewStop(); brewDraw(); }
  else brewStart();
};
$('brew-next').onclick = () => { if (brew.round < brew.tea.secs.length - 1) brewSet(brew.round + 1); };
$('brew-reset').onclick = () => brewSet(0);

// ===== 你适合哪杯茶 =====
const QUIZ = [
  { q: '你喜欢什么样的味道？', a: [
    ['清清爽爽，像春天', { maofeng: 2, tieguanyin: 1 }], ['花香，带一点甜', { tieguanyin: 2, hongcha: 1 }],
    ['浓一点，有火香', { yancha: 2, liubao: 1 }], ['温温润润，不刺激', { baicha: 2, hongcha: 1, liubao: 1 }]] },
  { q: '通常什么时候想喝茶？', a: [
    ['早上，想醒一醒', { maofeng: 2, yancha: 1 }], ['午后，想发个呆', { tieguanyin: 2, hongcha: 1 }], ['晚上，也想来一杯', { baicha: 2, liubao: 2 }]] },
  { q: '今天的心情比较像？', a: [
    ['想一个人晒太阳', { maofeng: 1, tieguanyin: 1 }], ['想找人聊聊天', { yancha: 2, hongcha: 1 }], ['想安安静静的', { baicha: 1, liubao: 2 }]] },
];
const QUIZ_SAY = {
  maofeng: '你像春天的新芽，干净、清爽。泡一杯毛峰，看叶子在杯里慢慢站起来。',
  tieguanyin: '你喜欢有香气的日子。铁观音的兰花香，很适合午后发呆的你。',
  yancha: '你是有故事的人。岩茶的焙火香要慢慢品，最适合一边喝一边聊。',
  baicha: '你需要的是一杯不催你的茶。老白茶温温的，晚上喝也不怕。',
  liubao: '你喜欢安静、有厚度的东西。煮一壶六堡，整个人都会慢下来。',
  hongcha: '你好相处，红茶也是。甜甜暖暖的，谁喝都喜欢。',
};
const quiz = { i: 0, score: {} };
function quizDraw() {
  const box = $('quiz-body');
  if (quiz.i < QUIZ.length) {
    const q = QUIZ[quiz.i];
    box.innerHTML = `<p class="step">${quiz.i + 1} / ${QUIZ.length}</p><p class="ask">${tx(q.q)}</p>` + q.a.map((o, k) => `<button type="button" class="opt" data-k="${k}">${tx(o[0])}</button>`).join('');
  } else {
    const id = Object.entries(quiz.score).sort((a, b) => b[1] - a[1])[0][0], t = BREW.find(x => x.id === id);
    box.innerHTML = `<div class="result"><img src="img/${t.img}.jpg" alt=""><div><p class="step">${tx('你适合')}</p><p class="win">${tx(t.name)}</p></div></div><p class="say">${tx(QUIZ_SAY[id])}</p>
      <p class="acts"><button type="button" class="btn solid" data-brew="${id}">${tx('泡这一杯')}</button><button type="button" class="btn" data-again>${tx('再测一次')}</button></p>`;
  }
}
$('quiz-body').onclick = e => {
  const o = e.target.closest('.opt'), b = e.target.closest('[data-brew]');
  if (o) { Object.entries(QUIZ[quiz.i].a[o.dataset.k][1]).forEach(([k, v]) => { quiz.score[k] = (quiz.score[k] || 0) + v; }); quiz.i++; quizDraw(); }
  else if (b) { brewPick(b.dataset.brew); $('brew').scrollIntoView({ behavior: 'smooth', block: 'center' }); }
  else if (e.target.closest('[data-again]')) { quiz.i = 0; quiz.score = {}; quizDraw(); }
};

// ===== 看茶叶，猜茶名 =====
const GUESS = [
  ['maofeng-leaves', '黄山毛峰', '芽叶细细尖尖、带着白毫，是绿茶。'],
  ['tieguanyin', '铁观音', '卷成一粒一粒的，砂绿色，泡开会慢慢舒展。'],
  ['rougui-leaves', '武夷岩茶', '条索粗壮、乌褐色，闻起来有焙火香。'],
  ['whitetea-leaves', '老白茶', '叶片自然摊开、有褐有黄，像晒干的落叶。'],
  ['liubao-leaves', '陈年六堡', '黑褐色的条索，是黑茶，越放越醇。'],
  ['tea-ball', '龙珠茶', '手工揉成的小圆球，一颗刚好泡一次。'],
];
const guess = { order: [], i: 0, right: 0, picked: null, opts: [] };
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
function guessNew() { guess.order = shuffle(GUESS).slice(0, 5); guess.i = 0; guess.right = 0; guessRound(); }
function guessRound() { guess.picked = null; const ans = guess.order[guess.i][1]; guess.opts = shuffle([ans, ...shuffle(GUESS.map(g => g[1]).filter(n => n !== ans)).slice(0, 3)]); guessDraw(); }
function guessDraw() {
  const box = $('guess-body');
  if (guess.i >= guess.order.length) {
    const r = guess.right, title = r === 5 ? '可以来帮我泡茶了' : r >= 3 ? '懂茶的人' : '茶桌上的新朋友';
    box.innerHTML = `<p class="step">${tx('答对')}</p><p class="win">${r} / 5</p><p class="say">${tx(title + (r === 5 ? '！全对，下次来我请你喝好茶。' : r >= 3 ? '，再多喝几次就全认得了。' : '，没关系，来喝一次就记住了。'))}</p><p class="acts"><button type="button" class="btn solid" data-again>${tx('再玩一次')}</button></p>`;
    return;
  }
  const [img, ans, fact] = guess.order[guess.i], done = guess.picked !== null;
  box.innerHTML = `<p class="step">${guess.i + 1} / 5</p><img class="shot" src="img/${img}.jpg" alt="">` +
    guess.opts.map(n => `<button type="button" class="opt${done ? (n === ans ? ' yes' : n === guess.picked ? ' no' : '') : ''}" data-n="${n}"${done ? ' disabled' : ''}>${tx(n)}</button>`).join('') +
    (done ? `<p class="say">${tx((guess.picked === ans ? '答对了！' : '这是' + ans + '。') + fact)}</p><p class="acts"><button type="button" class="btn solid" data-nextq>${tx(guess.i === 4 ? '看成绩' : '下一题')}</button></p>` : '');
}
$('guess-body').onclick = e => {
  const o = e.target.closest('.opt');
  if (o && guess.picked === null) { guess.picked = o.dataset.n; if (guess.picked === guess.order[guess.i][1]) guess.right++; guessDraw(); }
  else if (e.target.closest('[data-nextq]')) { guess.i++; if (guess.i < guess.order.length) guessRound(); else guessDraw(); }
  else if (e.target.closest('[data-again]')) guessNew();
};

// 繁简切换后，把动态产生的字重画一次
window.playRefresh = () => { [...$('brew-teas').children].forEach((b, i) => { b.textContent = tx(BREW[i].name); }); brewInfo(); brewDraw(); quizDraw(); guessDraw(); };
brewPick('maofeng'); quizDraw(); guessNew();
