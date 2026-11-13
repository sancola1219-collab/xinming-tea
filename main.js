// ===== 二十四节气资料（日期为大约日期，每年前后差一两天） =====
// 每个节气配一张照片：[档名, 取景位置]，24 张都不一样。
const TERM_IMG = {
  立春: ['gaiwan-red', '50% 50%'], 雨水: ['hand-pitcher', '50% 50%'], 惊蛰: ['pine-saucer', '50% 50%'], 春分: ['tea-table', '50% 50%'],
  清明: ['maofeng-leaves', '50% 50%'], 谷雨: ['poem-cup', '50% 50%'],
  立夏: ['tieguanyin', '50% 50%'], 小满: ['round-table', '50% 50%'], 芒种: ['pour', '50% 50%'], 夏至: ['sky-pitcher', '50% 55%'],
  小暑: ['gourd', '50% 30%'], 大暑: ['topview', '50% 50%'],
  立秋: ['rougui-leaves', '50% 50%'], 处暑: ['rougui-cup', '50% 40%'], 白露: ['zisha-pot', '50% 55%'], 秋分: ['osmanthus', '50% 35%'],
  寒露: ['vase', '50% 45%'], 霜降: ['copper-scoop', '50% 60%'],
  立冬: ['kettle-stove', '50% 50%'], 小雪: ['liubao-leaves', '50% 50%'], 大雪: ['steam-kettle', '50% 55%'], 冬至: ['incense-table', '50% 50%'],
  小寒: ['tea-ball', '50% 50%'], 大寒: ['whitetea-leaves', '50% 50%'],
};
const TERMS = [
  ['立春', 2, 4, '春', '东风解冻，万物抬头。', '红茶', '开春第一泡，给自己一个好兆头。'],
  ['雨水', 2, 19, '春', '雨落无声，草色遥看。', '红茶', '天还湿冷，红茶暖手，一杯一杯慢慢喝。'],
  ['惊蛰', 3, 5, '春', '春雷一响，百虫苏醒。', '红茶或淡一点的岩茶', '换季容易困，喝点有香气的茶提提神。'],
  ['春分', 3, 20, '春', '昼夜平分，春色正中。', '等新茶的时候，先喝存茶', '新茶快来了，把去年的茶好好喝完。'],
  ['清明', 4, 4, '春', '气清景明，新芽初长。', '黄山毛峰（明前茶）', '一年最期待的时候，春芽嫩得不得了。'],
  ['谷雨', 4, 20, '春', '雨生百谷，茶香正浓。', '黄山毛峰', '谷雨前后的茶最耐泡，香气也足。'],
  ['立夏', 5, 5, '夏', '绿树阴浓，夏日初长。', '绿茶', '天热了，玻璃杯泡绿茶，看着就清爽。'],
  ['小满', 5, 21, '夏', '小得盈满，刚刚好。', '绿茶', '不求太满，一杯刚刚好的茶就够。'],
  ['芒种', 6, 5, '夏', '有芒之谷，忙种忙收。', '绿茶', '再忙也留十分钟，泡一杯给自己。'],
  ['夏至', 6, 21, '夏', '日长之至，蝉鸣初起。', '清饮一盏', '白天最长的一天，在窗边慢慢喝。'],
  ['小暑', 7, 7, '夏', '温风至，蟋蟀居壁。', '清淡的茶', '暑气渐盛，茶泡淡一点、水多一点。'],
  ['大暑', 7, 22, '夏', '土润溽暑，大雨时行。', '清淡的茶', '最热的时候，一壶茶放凉了也好喝。'],
  ['立秋', 8, 7, '秋', '凉风至，白露降。', '岩茶', '秋天来了，把焙火的岩茶拿出来。'],
  ['处暑', 8, 23, '秋', '暑气至此而止。', '岩茶', '热终于要退了，香香的岩茶最对味。'],
  ['白露', 9, 7, '秋', '露凝而白，秋意渐浓。', '武夷岩茶', '早晚凉了，喝点暖暖的焙火香。'],
  ['秋分', 9, 23, '秋', '昼夜均，寒暑平。', '武夷岩茶', '秋天过一半，约朋友来喝一泡。'],
  ['寒露', 10, 8, '秋', '露气寒冷，将凝结也。', '岩茶或红茶', '天气干，茶要多喝，话也要多聊。'],
  ['霜降', 10, 23, '秋', '气肃而凝，露结为霜。', '岩茶', '秋天最后一个节气，烤栗子配岩茶。'],
  ['立冬', 11, 7, '冬', '水始冰，地始冻。', '陈年六堡茶', '宜煮老茶、围炉、慢慢聊。'],
  ['小雪', 11, 22, '冬', '虹藏不见，天气上升。', '陈年六堡茶', '小壶煮着，满屋子都是陈香。'],
  ['大雪', 12, 7, '冬', '至此而雪盛矣。', '陈年六堡茶', '下雪了也不怕，手里有一杯热茶。'],
  ['冬至', 12, 21, '冬', '日短之至，阳气始生。', '陈年六堡茶', '冬至大如年，煮一壶老茶陪家人。'],
  ['小寒', 1, 5, '冬', '雁北乡，鹊始巢。', '陈年六堡茶', '最冷的时候，煮一壶红浓的老茶。'],
  ['大寒', 1, 20, '冬', '寒气之逆极。', '红茶', '一年的最后一个节气，暖暖的红茶送给自己。'],
];

// 今天落在哪个节气
function currentTerm(d = new Date()) {
  const md = (d.getMonth() + 1) * 100 + d.getDate();
  const sorted = [...TERMS].sort((a, b) => (a[1] * 100 + a[2]) - (b[1] * 100 + b[2]));
  let cur = sorted[sorted.length - 1];
  for (const t of sorted) if (t[1] * 100 + t[2] <= md) cur = t;
  return cur[0];
}
const $ = id => document.getElementById(id);
const card = $('term-card');
const todayIdx = TERMS.findIndex(t => t[0] === currentTerm());
let idx = todayIdx, toTW = null, trad = false;
const tx = s => (trad && toTW ? toTW(s) : s);

// 节气卡片：一次只看一个，可以前后翻
function showTerm(i, animate) {
  idx = (i + TERMS.length) % TERMS.length;
  const t = TERMS[idx];
  const fill = () => {
    $('term-name').textContent = tx(t[0]);
    $('term-date').textContent = tx(`${t[3]} · 约 ${t[1]} 月 ${t[2]} 日`);
    $('term-line').textContent = tx(t[4]);
    $('term-tea').textContent = tx(t[5]);
    $('term-say').textContent = tx(t[6]);
    $('term-img').src = `img/${TERM_IMG[t[0]][0]}.jpg`;
    $('term-img').style.objectPosition = TERM_IMG[t[0]][1];
    $('term-img').alt = tx(`${t[0]}的茶`);
    $('term-today').hidden = idx !== todayIdx;
    $('term-now').hidden = idx === todayIdx;
    card.classList.remove('swap');
  };
  if (animate) { card.classList.add('swap'); setTimeout(fill, 240); } else fill();
}
$('term-prev').onclick = () => showTerm(idx - 1, true);
$('term-next').onclick = () => showTerm(idx + 1, true);
$('term-now').onclick = () => showTerm(todayIdx, true);
showTerm(todayIdx, false);

// 进场动画
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 茶诗轮播
const poems = [...document.querySelectorAll('.poem-card')];
let pi = 0;
setInterval(() => { poems[pi].classList.remove('active'); pi = (pi + 1) % poems.length; poems[pi].classList.add('active'); }, 5500);

// 联络方式（index.html 底部 CONTACT 有填才显示）
const labels = { shop: '茶舍', addr: '地址', hours: '时间', phone: '电话', wechat: '微信', line: 'LINE', map: '地图' };
const ul = $('contact');
Object.entries(CONTACT).forEach(([k, v]) => {
  if (!v) return;
  const li = document.createElement('li');
  li.innerHTML = `<b>${labels[k]}</b>`;
  if (k === 'map') { const a = document.createElement('a'); a.href = v; a.target = '_blank'; a.rel = 'noopener'; a.textContent = '开启地图'; li.appendChild(a); }
  else if (k === 'phone') { const a = document.createElement('a'); a.href = 'tel:' + v.replace(/\s/g, ''); a.textContent = v; li.appendChild(a); }
  else li.append(v);
  ul.appendChild(li);
});
if (ul.children.length) $('contact-empty').style.display = 'none';
$('year').textContent = new Date().getFullYear();

// 繁／简切换（节气卡片的字是动态填的，切换后重填一次）
const lbtn = $('lang');
let conv = null;
const setLang = on => {
  if (!window.OpenCC) return;
  if (!conv) { toTW = OpenCC.Converter({ from: 'cn', to: 'tw' }); conv = OpenCC.HTMLConverter(toTW, document.documentElement, 'zh-Hans', 'zh-Hant'); }
  if (on) conv.convert(); else conv.restore();
  trad = on;
  lbtn.textContent = on ? '简' : '繁';
  showTerm(idx, false);
  try { localStorage.setItem('xm-lang2', on ? 'tw' : 'cn'); } catch (e) {}
};
lbtn.onclick = () => setLang(!trad);
window.addEventListener('load', () => {
  let saved = null;
  try { saved = localStorage.getItem('xm-lang2'); } catch (e) {}
  if (saved === 'tw') setLang(true);
});

// 背景音乐：一进站先试着播；被浏览器挡下来的话，第一次点或碰画面就开始
const bgm = $('bgm'), mbtn = $('music');
let fade, musicTouched = false;
const ramp = (to, done) => {
  clearInterval(fade);
  let ticks = 0;  // iPhone 不能用程式调音量，最多跑 2 秒就收尾
  fade = setInterval(() => {
    const v = bgm.volume + (to > bgm.volume ? .04 : -.06);
    if (++ticks > 25 || (to > bgm.volume && v >= to) || (to <= bgm.volume && v <= to)) { bgm.volume = to; clearInterval(fade); done && done(); }
    else bgm.volume = Math.max(0, Math.min(1, v));
  }, 80);
};
const setMusic = on => {
  mbtn.classList.toggle('on', on);
  mbtn.setAttribute('aria-pressed', on);
  mbtn.querySelector('.mtxt').textContent = on ? '播放中' : '音乐';
  if (on) { bgm.volume = 0; bgm.play().then(() => ramp(.55)).catch(() => setMusic(false)); }
  else ramp(0, () => bgm.pause());
};
mbtn.onclick = e => { e.stopPropagation(); musicTouched = true; setMusic(bgm.paused || !mbtn.classList.contains('on')); };
mbtn.addEventListener('pointerdown', () => { musicTouched = true; }, true);
const autoStart = e => {
  if (e && e.target && e.target.closest && e.target.closest('.film-frame')) return;   // 点影片不开背景乐
  ['pointerdown', 'keydown', 'touchend'].forEach(ev => removeEventListener(ev, autoStart, true));
  if (!musicTouched && bgm.paused) setMusic(true);
};
['pointerdown', 'keydown', 'touchend'].forEach(ev => addEventListener(ev, autoStart, true));
bgm.volume = 0;
bgm.play().then(() => { if (!musicTouched) { mbtn.classList.add('on'); mbtn.setAttribute('aria-pressed', true); mbtn.querySelector('.mtxt').textContent = '播放中'; ramp(.55); } }).catch(() => {});

// 个人介绍影片：进站静音自动播；开了声音就把背景乐停掉，两个不会叠在一起
const intro = $('intro'), fsound = $('film-sound');
const introLoud = () => { musicTouched = true; if (!bgm.paused) setMusic(false); fsound.hidden = true; };
fsound.onclick = () => { intro.muted = false; intro.currentTime = 0; intro.play(); introLoud(); };
intro.addEventListener('volumechange', () => { if (!intro.muted && intro.volume > 0) introLoud(); });
intro.addEventListener('play', () => { if (!intro.muted) introLoud(); });
