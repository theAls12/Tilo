/* Partículas: confeti, recortes y anillos */
'use strict';
/* ================= particles ================= */
const CONF=['#e63946','#ffd23f','#2a9d8f','#4dabf7','#ff8fa3','#fff4e0','#f28c38','#9b5de5'];
function confetti(arr,x,y,n,spd,o={}){for(let i=0;i<n;i++){const a=o.ang!==undefined?o.ang+(Math.random()-.5)*(o.spread||1):Math.random()*6.283,s=spd*(.3+Math.random()*.9);arr.push({k:'conf',x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-(o.up||0),w:4+Math.random()*5,h:3+Math.random()*4,rot:Math.random()*6.3,vr:(Math.random()-.5)*12,fl:Math.random()*6.3,vf:6+Math.random()*10,c:(o.cols||CONF)[i%(o.cols||CONF).length],life:0,max:(o.life||1.2)*(.7+Math.random()*.6),grav:o.grav===undefined?520:o.grav,drag:o.drag||1.8})}}
function scraps(x,y,n,cols,spd){for(let i=0;i<n;i++){const a=Math.random()*6.283,s=spd*(.3+Math.random()*.8);parts.push({k:'tri',x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-60,r:3+Math.random()*4,rot:Math.random()*6.3,vr:(Math.random()-.5)*14,c:cols[i%cols.length],life:0,max:.6+Math.random()*.4,grav:600,drag:2})}}
function tearApart(s,x,y,flip,cols){const keep={c:copyCanvas(s.c),ox:s.ox,oy:s.oy,w:s.w,h:s.h};for(const side of[0,1])parts.push({k:'half',s:keep,side,x,y,vx:(side?1:-1)*(120+Math.random()*80),vy:-260-Math.random()*120,rot:0,vr:(side?1:-1)*(3+Math.random()*3),flip,life:0,max:1.1,grav:1300,drag:.3});scraps(x,y-10,10,cols,260)}
function copyCanvas(c){const o=mk(c.width,c.height);o.getContext('2d').drawImage(c,0,0);return o}
function ring(x,y,col,r,max=.5){parts.push({k:'ring',x,y,c:col,r,life:0,max})}
function updList(arr,dt){for(const p of arr){if(p.k==='flat'&&p.then&&p.life+dt>=p.max){const f=p.then;p.then=null;f()}}for(const p of arr){p.life+=dt;if(p.k==='ring')continue;const d=Math.max(0,1-p.drag*dt);p.vx*=d;p.vy=p.vy*d+p.grav*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.vr)p.rot+=p.vr*dt;if(p.vf)p.fl+=p.vf*dt}return arr.filter(p=>p.life<p.max)}
function drawList(g,arr){for(const p of arr){const k=p.life/p.max;if(k<0)continue;const a=k>.75?(1-k)/.25:1;g.globalAlpha=a;
 if(p.k==='conf'){g.save();g.translate(p.x,p.y);g.rotate(p.rot);const f=Math.cos(p.fl);g.scale(1,f);g.fillStyle=f>0?p.c:shade(p.c,-.3);g.fillRect(-p.w/2,-p.h/2,p.w,p.h);g.restore()}
 else if(p.k==='tri'){g.save();g.translate(p.x,p.y);g.rotate(p.rot);poly(g,[[-p.r,p.r*.7],[0,-p.r],[p.r,p.r*.7]],p.c);g.restore()}
 else if(p.k==='ring'){g.globalAlpha=(1-k)*.8;g.strokeStyle=p.c;g.lineWidth=5*(1-k)+1;g.setLineDash([7,5]);g.beginPath();g.arc(p.x,p.y,p.r*(1-Math.pow(1-k,3)),0,6.3);g.stroke();g.setLineDash([])}
 else if(p.k==='flat'){const q=p.life/p.max;blit(g,p.s,p.x,p.y,{flip:p.flip,sx:1.25+q*.45,sy:.6-q*.3})}
 else if(p.k==='half'){const s=p.s;g.globalAlpha=1;blit(g,s,p.x,p.y,{rot:p.rot,flip:p.flip,alpha:a,clip:p.side?[0,s.oy,s.ox+s.w,s.h]:[s.ox,s.oy,-s.ox,s.h]})}}g.globalAlpha=1}
