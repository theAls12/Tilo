/* Telón, menús, pausa, pantalla completa y flujo de partida */
'use strict';
/* ================= curtains & flow ================= */
const cur={c:1,target:1,cb:null,speed:1};
function updCurtain(dt){const d=cur.target-cur.c;if(Math.abs(d)<.002){cur.c=cur.target;if(cur.cb){const f=cur.cb;cur.cb=null;f()}return}cur.c+=Math.sign(d)*Math.min(Math.abs(d),dt*cur.speed)}
function closeCurtain(cb){if(cur.c<.99)SFX.curtain();cur.target=1;cur.speed=1.3;cur.cb=cb}
function openCurtain(){SFX.curtain();cur.target=0;cur.speed=.85;cur.cb=null}
const $=id=>document.getElementById(id);
function renderLevelCards(){const box=$('levels');box.innerHTML='';THEMES.forEach((th,i)=>{const b=document.createElement('button');b.className='ticket';b.id='lvl'+i;b.innerHTML=`<span><span class="act">${th.act}</span><span class="nm">${th.name}</span><span class="st">${progress.stars[i]?'★ Estrella conseguida':'☆ Sin estrella'}</span></span>`;b.onclick=()=>{audioOn();startGame(i)};box.appendChild(b)})}
renderLevelCards();
$('btnPlay').onclick=()=>{audioOn();const n=progress.stars.indexOf(false);startGame(n<0?0:n)};
$('btnResume').onclick=()=>{goFull();togglePause()};$('btnPauseMenu').onclick=()=>goMenu();$('btnDoneMenu').onclick=()=>goMenu();
$('btnNext').onclick=()=>{audioOn();startGame(levelIdx<2?levelIdx+1:0)};
$('pauseBtn').onclick=()=>{if(state==='play'||state==='paused')togglePause()};
const fsEl=()=>document.fullscreenElement||document.webkitFullscreenElement;
const fsOK=!!(document.documentElement.requestFullscreen||document.documentElement.webkitRequestFullscreen);
function goFull(){if(!fsOK||fsEl())return;const el=document.documentElement;try{const r=(el.requestFullscreen||el.webkitRequestFullscreen).call(el,{navigationUI:'hide'});const lock=()=>{try{if(touchMode&&screen.orientation&&screen.orientation.lock)screen.orientation.lock('landscape').catch(()=>{})}catch(e){}};if(r&&r.then)r.then(lock).catch(()=>{});else lock()}catch(e){}}
function exitFull(){try{(document.exitFullscreen||document.webkitExitFullscreen).call(document).catch?.(()=>{})}catch(e){}}
function toggleFull(){fsEl()?exitFull():goFull()}
$('fsBtn').onclick=()=>toggleFull();
function showHud(on){$('pauseBtn').hidden=!on;$('fsBtn').hidden=!(on&&fsOK);$('touch').hidden=!(on&&touchMode);checkRotate()}
function checkRotate(){const r=touchMode&&innerHeight>innerWidth&&(state==='play'||state==='win');$('rotate').hidden=!r}
addEventListener('resize',()=>checkRotate());applyTouchHint();
function togglePause(){if(state==='play'){state='paused';$('pause').hidden=false;$('btnResume').focus()}else if(state==='paused'){state='play';$('pause').hidden=true}}
function startGame(i){goFull();$('menu').hidden=true;$('pause').hidden=true;$('done').hidden=true;sconf=[];state='busy';closeCurtain(()=>{loadLevel(i);state='play';showHud(true);openCurtain()})}
function goMenu(){$('pause').hidden=true;$('done').hidden=true;showHud(false);state='busy';closeCurtain(()=>{state='menu';renderLevelCards();$('menu').hidden=false})}
