/* Arranque y bucle principal */
'use strict';
let last=performance.now();
function frame(now){const dt=Math.min(1/30,(now-last)/1000);last=now;if($('rotate').hidden)update(dt);for(const k in pressed)pressed[k]=false;render();requestAnimationFrame(frame)}
CURTAIN=paintCurtain();VALANCE=paintValance();
loadLevel(0);state='menu';
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{fontsOK=true}).catch(()=>{});
setTimeout(()=>{prepare(1);prepare(2)},500);
requestAnimationFrame(frame);
