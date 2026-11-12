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
const SEASON_COLOR = { 春: '#7f9a6e', 夏: '#5f8f97', 秋: '#b9803f', 冬: '#6b6a86' };

// 今天落在哪个节气
function currentTerm(d = new Date()) {
  const md = (d.getMonth() + 1) * 100 + d.getDate();
  const sorted = [...TERMS].sort((a, b) => (a[1] * 100 + a[2]) - (b[1] * 100 + b[2]));
  let cur = sorted[sorted.length - 1];
  for (const t of sorted) if (t[1] * 100 + t[2] <= md) cur = t;
  return cur[0];
}

const wheel = document.getElementById('wheel');
const card = document.getElementById('term-card');
const $ = id => document.getElementById(id);
const todayName = currentTerm();

TERMS.forEach(t => {
  const b = document.createElement('button');
  b.type = 'button'; b.textContent = t[0]; b.dataset.term = t[0]; b.dataset.season = t[3];
  b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', 'false');
  if (t[0] === todayName) b.classList.add('today');
  b.onclick = () => showTerm(t[0], true);
  wheel.appendChild(b);
});

function showTerm(name, animate) {
  const t = TERMS.find(x => x[0] === name);
  const fill = () => {
    $('term-name').textContent = t[0];
    $('term-season').textContent = t[3];
    $('term-season').style.background = SEASON_COLOR[t[3]];
    $('term-date').textContent = `约 ${t[1]} 月 ${t[2]} 日`;
    $('term-line').textContent = t[4];
    $('term-tea').textContent = t[5];
    $('term-say').textContent = t[6];
    $('term-img').src = `img/${TERM_IMG[t[0]][0]}.jpg`;
    $('term-img').style.objectPosition = TERM_IMG[t[0]][1];
    $('term-img').alt = `${t[3]}天的茶`;
    card.classList.remove('swap');
  };
  wheel.querySelectorAll('button').forEach(b => b.setAttribute('aria-selected', b.dataset.term === name ? 'true' : 'false'));
  const btn = wheel.querySelector(`[data-term="${name}"]`);
  btn.scrollIntoView({ behavior: animate ? 'smooth' : 'auto', block: 'nearest', inline: 'center' });
  if (animate) { card.classList.add('swap'); setTimeout(fill, 220); } else fill();
}

// 首屏「今日节气」
const td = TERMS.find(x => x[0] === todayName);
document.querySelector('[data-term-name]').textContent = td[0];
document.querySelector('[data-term-tip]').textContent = td[6];
$('today').style.borderLeftColor = SEASON_COLOR[td[3]];
showTerm(todayName, false);
scrollTo(0, 0);

// 四季卡片：点了跳到该季的节气
document.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', () => setTimeout(() => showTerm(a.dataset.jump, true), 500)));

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

// 繁／简切换（节气卡片的文字是动态填的，切换时一并转）
const lbtn = $('lang');
let toCN = null, simp = false, conv = null;
const setLang = s => {
  if (!window.OpenCC) return;
  if (!conv) { toCN = OpenCC.Converter({ from: 'cn', to: 'tw' }); conv = OpenCC.HTMLConverter(toCN, document.documentElement, 'zh-Hans', 'zh-Hant'); }
  if (s) conv.convert(); else conv.restore();
  simp = s;
  lbtn.textContent = s ? '简' : '繁';
  try { localStorage.setItem('xm-lang2', s ? 'tw' : 'cn'); } catch (e) {}
};
lbtn.onclick = () => { const sel = wheel.querySelector('[aria-selected="true"]').dataset.term; setLang(!simp); if (!simp) showTerm(sel, false); };
// 简体模式下点节气，填完再转一次
const _show = showTerm;
showTerm = (n, a) => { _show(n, a); if (simp && toCN) setTimeout(() => card.querySelectorAll('h3,p,dd').forEach(e => { e.textContent = toCN(e.textContent); }), a ? 260 : 0); };
window.addEventListener('load', () => {
  let saved = null;
  try { saved = localStorage.getItem('xm-lang2'); } catch (e) {}
  if (saved === 'tw') setLang(true);
});

// 背景音乐：浏览器不允许自动有声播放，按「听琴」才开始；音量慢慢淡入
const bgm = $('bgm'), mbtn = $('music');
let fade;
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
mbtn.onclick = () => setMusic(bgm.paused || !mbtn.classList.contains('on'));

// 水墨山岚：往下卷时山一层层移动（视差）
const inkLayers = [...document.querySelectorAll('.ml[data-k]')];
const inkScene = document.querySelector('.ink-scene');
let inkTick = false;
const inkMove = () => {
  const r = inkScene.getBoundingClientRect();
  if (r.bottom > 0 && r.top < innerHeight) {
    const y = (r.top + r.height / 2) - innerHeight / 2;  // 场景置中时为 0，上下卷动时各层位移不同
    inkLayers.forEach(e => { e.style.transform = `translateY(${(y * e.dataset.k).toFixed(1)}px)`; });
  }
  inkTick = false;
};
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  addEventListener('scroll', () => { if (!inkTick) { inkTick = true; requestAnimationFrame(inkMove); } }, { passive: true });
  inkMove();
}
