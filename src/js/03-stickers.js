/* Pegatinas: sprites con borde blanco recortado (con caché) */
'use strict';
/* ---------- stickers: sprite + white cut border, cached ---------- */
const SS=2,SP=5;
function makeSticker(w,h,ax,ay,draw,reuse){const W=(w+SP*2)*SS,H=(h+SP*2)*SS;let a,b,o;
 if(reuse&&reuse.a.width===W&&reuse.a.height===H){a=reuse.a;b=reuse.b;o=reuse.o}else{a=mk(W,H);b=mk(W,H);o=mk(W,H)}
 const ga=a.getContext('2d'),gb=b.getContext('2d'),go=o.getContext('2d');ga.setTransform(1,0,0,1,0,0);ga.clearRect(0,0,W,H);gb.clearRect(0,0,W,H);go.clearRect(0,0,W,H);
 ga.setTransform(SS,0,0,SS,(SP+ax)*SS,(SP+ay)*SS);ga.lineCap='round';ga.lineJoin='round';draw(ga);ga.setTransform(1,0,0,1,0,0);sh(ga,false);
 gb.globalCompositeOperation='source-over';gb.drawImage(a,0,0);gb.globalCompositeOperation='source-in';gb.fillStyle='#fffaf0';gb.fillRect(0,0,W,H);gb.globalCompositeOperation='source-over';
 const r=2.4*SS;for(let i=0;i<12;i++){const t=i/12*6.283;go.drawImage(b,Math.cos(t)*r,Math.sin(t)*r)}go.drawImage(a,0,0);paperize(go,W,H,.9);
 return{a,b,o,c:o,ox:-(SP+ax),oy:-(SP+ay),w:w+2*SP,h:h+2*SP}}
const STK={};function st(key,w,h,ax,ay,draw){return STK[key]||(STK[key]=makeSticker(w,h,ax,ay,draw))}
function blit(g,s,x,y,o={}){g.save();g.translate(x,y);if(o.rot)g.rotate(o.rot);g.scale((o.flip||1)*(o.sx||1),o.sy||1);if(o.alpha!==undefined)g.globalAlpha=o.alpha;
 if(o.shadow!==false){g.shadowColor='rgba(28,8,30,.4)';g.shadowBlur=7*DS;g.shadowOffsetX=3*DS;g.shadowOffsetY=5*DS}
 if(o.clip){g.beginPath();g.rect(o.clip[0],o.clip[1],o.clip[2],o.clip[3]);g.clip()}
 g.drawImage(s.c,s.ox,s.oy,s.w,s.h);g.restore()}
function pin(g,x,y){circ(g,x,y,1.9,'#e8b94a');circ(g,x-.5,y-.6,.8,'#fff3c0')}
