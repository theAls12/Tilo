/* Teclado y controles táctiles */
'use strict';
/* ================= input ================= */
const keys={},pressed={};
const KM={ArrowLeft:'left',KeyA:'left',ArrowRight:'right',KeyD:'right',ArrowUp:'jump',KeyW:'jump',KeyZ:'jump',KeyK:'jump',Space:'atk',KeyX:'atk',KeyJ:'atk',Escape:'pause',KeyP:'pause',KeyM:'mute',KeyF:'full'};
addEventListener('keydown',e=>{const a=KM[e.code];if(!a)return;if(['left','right','jump','atk'].includes(a)&&!(e.target.closest&&e.target.closest('button')&&a==='atk'&&state!=='play'))e.preventDefault();audioOn();if(!keys[a])pressed[a]=true;keys[a]=true;
 if(a==='pause'&&(state==='play'||state==='paused'))togglePause();if(a==='mute')muted=!muted;if(a==='full')toggleFull()});
addEventListener('keyup',e=>{const a=KM[e.code];if(a)keys[a]=false});
addEventListener('blur',()=>{for(const k in keys)keys[k]=false;if(state==='play')togglePause()});
document.querySelectorAll('.tb').forEach(b=>{const k=b.dataset.k;const on=e=>{e.preventDefault();audioOn();if(!keys[k])pressed[k]=true;keys[k]=true;b.classList.add('on')};const off=()=>{keys[k]=false;b.classList.remove('on')};b.addEventListener('pointerdown',on);b.addEventListener('pointerup',off);b.addEventListener('pointercancel',off);b.addEventListener('pointerleave',off)});
let touchMode=matchMedia('(pointer:coarse)').matches||matchMedia('(hover:none)').matches||/Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
function applyTouchHint(){if(touchMode)document.getElementById('keysHint').textContent='Móvil: usa las flechas para moverte, el triángulo grande para saltar y la espada para el espadazo. Juega con el móvil en horizontal.'}
addEventListener('touchstart',()=>{if(!touchMode){touchMode=true;applyTouchHint();showHud(!document.getElementById('pauseBtn').hidden)}},{passive:true});
