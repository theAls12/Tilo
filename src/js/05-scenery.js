/* Pintores de escenario: cielo, colinas, árboles, terreno, telón */
'use strict';
/* ================= scenery painters ================= */
const hillY=(x,base,amp,f,ph)=>base-amp*(.6*Math.sin(x*f+ph)+.4*Math.sin(x*f*2.3+ph*1.7));
function hillPath(w,base,amp,f,ph){const p=new Path2D();p.moveTo(-20,VH+20);for(let x=-20;x<=w+20;x+=8)p.lineTo(x,hillY(x,base,amp,f,ph));p.lineTo(w+20,VH+20);p.closePath();return p}
function pine(g,x,y,h,col){const dk=shade(col,-.22);sh(g,true,3,4,7,.3);rrect(g,x-h*.05,y-h*.25,h*.1,h*.27,2,shade(col,-.45));
 for(let i=0;i<3;i++){const ty=y-h*(.22+i*.24),wd=h*(.42-i*.1),hh=h*.36;const pts=[[x-wd,ty],[x,ty-hh],[x+wd,ty]];for(let z=4;z>=0;z--){pts.push([x-wd+wd*2*z/4,ty+(z%2?4:0)])}
   sh(g,true,3,5,8,.32);poly(g,[[x-wd,ty],[x,ty-hh],[x+wd,ty],[x+wd*.5,ty+4],[x,ty],[x-wd*.5,ty+4]],col);sh(g,false);poly(g,[[x,ty-hh],[x+wd,ty],[x+wd*.5,ty+4],[x,ty]],dk)}sh(g,false)}
function lolly(g,x,y,h,col,trunk){sh(g,true,3,5,8,.3);rrect(g,x-3,y-h*.55,6,h*.57,3,trunk);const r=h*.3;sh(g,true,4,6,10,.32);circ(g,x,y-h*.62,r,col);sh(g,true,2,3,5,.25);circ(g,x-r*.25,y-h*.66,r*.62,shade(col,.14));sh(g,false);circ(g,x-r*.38,y-h*.7,r*.25,shade(col,.28))}
function bigTree(g,x,th){const top=150+R()*80,bw=24+R()*10;sh(g,true,6,8,14,.35);g.beginPath();g.moveTo(x-bw,VH+10);g.quadraticCurveTo(x-bw*.4,VH*.6,x-bw*.35,top);g.lineTo(x+bw*.35,top);g.quadraticCurveTo(x+bw*.4,VH*.6,x+bw,VH+10);g.closePath();g.fillStyle=th.trunk;g.fill();sh(g,false);
 g.save();g.clip();g.fillStyle=shade(th.trunk,-.25);g.fillRect(x+2,top,bw,VH);g.restore();
 for(let k=0;k<3;k++){const by=top+60+k*70+R()*20,d=k%2?1:-1;sh(g,true,3,5,8,.3);poly(g,[[x,by],[x+d*(60+R()*30),by-40-R()*20],[x+d*(66+R()*30),by-30],[x,by+12]],th.trunk);sh(g,false);sh(g,true,4,6,10,.3);circ(g,x+d*(70+R()*20),by-48,22+R()*10,th.near[1]);}
 const cols=[th.near[0],th.near[1],shade(th.near[0],.12)];for(let k=0;k<5;k++){sh(g,true,5,7,12,.35);circ(g,x+(R()-.5)*150,top-20+(R()-.5)*60,50+R()*35,cols[k%3])}
 sh(g,true,2,3,6,.25);circ(g,x-30,top-40,30,shade(th.near[0],.22));sh(g,false)}
function bush(g,x,y,col){for(let k=0;k<3;k++){sh(g,true,3,5,8,.3);circ(g,x+(k-1)*22,y-(k===1?16:6),22+(k===1?6:0),k===1?shade(col,.1):col)}sh(g,false)}
function leafFrond(g,x,y,len,ang,col){g.save();g.translate(x,y);g.rotate(ang);sh(g,true,4,6,10,.35);g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(len*.35,-len*.5,0,-len);g.quadraticCurveTo(-len*.35,-len*.5,0,0);g.fillStyle=col;g.fill();sh(g,false);g.beginPath();g.moveTo(0,0);g.quadraticCurveTo(len*.35,-len*.5,0,-len);g.lineTo(0,0);g.fillStyle=shade(col,-.25);g.fill();g.strokeStyle=shade(col,.2);g.lineWidth=2;g.beginPath();g.moveTo(0,0);g.lineTo(0,-len*.92);g.stroke();g.restore()}

function paintSky(th,seed){R=mulberry(seed);const c=mk(VW,VH),g=c.getContext('2d');const gr=g.createLinearGradient(0,0,0,VH);gr.addColorStop(0,th.sky[0]);gr.addColorStop(1,th.sky[1]);g.fillStyle=gr;g.fillRect(0,0,VW,VH);
 if(th.bigSun){sh(g,true,0,6,20,.25);for(let k=0;k<4;k++){circ(g,620,330,150-k*30,['#ffe9a8','#ffd47a','#ffc06a','#ffae5c'][k])}sh(g,false)}
 for(let i=0;i<3;i++){const y=220+i*90;const p=new Path2D();p.moveTo(0,VH);p.lineTo(0,y);for(let x=0;x<=VW;x+=60){p.quadraticCurveTo(x+30,y+(i%2?14:-14)+R()*10,x+60,y)}p.lineTo(VW,VH);p.closePath();sh(g,true,0,-3,10,.12);g.fillStyle=th.bands[i];g.globalAlpha=th.bigSun?.55:.9;g.fill(p)}g.globalAlpha=1;sh(g,false);
 if(th.dark){for(let i=0;i<180;i++){g.globalAlpha=.3+R()*.7;circ(g,R()*VW,R()*VH*.7,R()*1.4+.3,R()<.8?'#eaf2ff':'#ffe9b0')}g.globalAlpha=1}
 paperize(g,VW,VH);return c}
function paintLayer(w,blur,seed,fn){R=mulberry(seed);const c=mk(w,VH),g=c.getContext('2d');fn(g);sh(g,false);paperize(g,w,VH);return blurC(c,blur)}
function paintFar(th,w,seed){return paintLayer(w,2.6,seed,g=>{const ph1=R()*6,ph2=R()*6;sh(g,true,4,6,14,.22);g.fillStyle=th.hills[0];g.fill(hillPath(w,300,40,.004,ph1));
 for(let x=10;x<w;x+=34+R()*60)pine(g,x,hillY(x,300,40,.004,ph1)+8,40+R()*30,shade(th.hills[0],-.1));
 sh(g,true,4,6,14,.25);g.fillStyle=th.hills[1];g.fill(hillPath(w,370,30,.006,ph2));
 for(let x=30;x<w;x+=50+R()*80)(R()<.5?pine:lolly)(g,x,hillY(x,370,30,.006,ph2)+10,46+R()*34,shade(th.hills[1],-.12),shade(th.hills[1],-.35))})}
function paintMid(th,w,seed){return paintLayer(w,1.2,seed,g=>{const ph=R()*6;sh(g,true,5,7,14,.28);g.fillStyle=th.mid[0];g.fill(hillPath(w,410,28,.005,ph));
 for(let x=20;x<w;x+=60+R()*90){const y=hillY(x,410,28,.005,ph)+12,h=90+R()*80;R()<.5?pine(g,x,y,h,th.mid[1]):lolly(g,x,y,h,th.mid[1],shade(th.mid[1],-.4))}
 sh(g,true,5,7,14,.28);g.fillStyle=shade(th.mid[0],-.12);g.fill(hillPath(w,470,16,.012,ph+2))})}
function paintNear(th,w,seed){return paintLayer(w,0,seed,g=>{for(let x=120;x<w;x+=260+R()*260)bigTree(g,x,th);
 for(let x=0;x<w;x+=90+R()*120)bush(g,x,VH-50+R()*20,th.near[1]);
 const p=new Path2D();p.moveTo(-10,VH+10);p.lineTo(-10,488);for(let x=-10;x<w+40;x+=40)p.quadraticCurveTo(x+20,474,x+40,488);p.lineTo(w+40,VH+10);p.closePath();sh(g,true,0,-4,12,.3);g.fillStyle=shade(th.near[1],-.35);g.fill(p)})}
function paintFG(th,w,seed){return paintLayer(w,4,seed,g=>{for(let x=420;x<w;x+=420+R()*520){const n=3+(R()*3|0);for(let k=0;k<n;k++)leafFrond(g,x+(R()-.5)*80,VH+42,62+R()*34,(k-(n-1)/2)*.42+(R()-.5)*.15,k%2?th.fg:shade(th.fg,.12))}})}
function paintTerrain(L,th,seed){R=mulberry(seed);const W=L.w*T,c=mk(W,VH),g=c.getContext('2d'),G=L.grid;
 const S=(x,y)=>{if(y<0)return false;if(y>=ROWS)return true;x=clamp(x,0,L.w-1);const ch=G[y][x];return ch==='#'||ch==='='};
 const body=new Path2D(),tops=[];
 for(let y=0;y<ROWS;y++)for(let x=0;x<L.w;x++){if(!S(x,y)||x<0)continue;if(G[y][x]!=='#'&&G[y][x]!=='=')continue;const r=12;
   const tl=(!S(x-1,y)&&!S(x,y-1))?r:0,tr=(!S(x+1,y)&&!S(x,y-1))?r:0,br=(!S(x+1,y)&&!S(x,y+1))?r:0,bl=(!S(x-1,y)&&!S(x,y+1))?r:0;
   if(body.roundRect)body.roundRect(x*T-.5,y*T-.5,T+1,T+1,[tl,tr,br,bl]);else body.rect(x*T-.5,y*T-.5,T+1,T+1);if(!S(x,y-1))tops.push([x,y])}
 sh(g,true,7,11,18,.42);g.fillStyle=th.body[0];g.fill(body);sh(g,false);
 g.save();g.clip(body);
 for(let k=0;k<7;k++){const y0=150+k*60+R()*20;const p=new Path2D();p.moveTo(-10,VH+10);p.lineTo(-10,y0);for(let x=-10;x<W+60;x+=60)p.quadraticCurveTo(x+30,y0+(R()-.5)*18,x+60,y0);p.lineTo(W+60,VH+10);p.closePath();sh(g,true,0,-3,6,.22);g.fillStyle=k%2?th.body[1]:shade(th.body[1],-.06);g.globalAlpha=.55;g.fill(p)}g.globalAlpha=1;
 for(let y=0;y<ROWS;y++)for(let x=0;x<L.w;x++){if(!S(x,y)||!S(x,y-1)||R()>.32)continue;const cx=x*T+6+R()*24,cy=y*T+6+R()*24;sh(g,true,2,3,4,.3);ell(g,cx,cy,4+R()*5,3+R()*3,R()<.5?th.stone:th.body[2],R()*3)}
 sh(g,false);g.strokeStyle='rgba(255,244,224,.55)';g.lineWidth=2;g.setLineDash([6,6]);g.beginPath();for(const[x,y]of tops){g.moveTo(x*T,y*T+18);g.lineTo(x*T+T,y*T+18)}g.stroke();g.setLineDash([]);
 g.restore();
 // grass strips with pinked/scalloped edge
 const gp=new Path2D(),hp=new Path2D();
 for(const[x,y]of tops){const x0=x*T,y0=y*T;const el=!S(x-1,y)||S(x-1,y-1)?4:0,er=!S(x+1,y)||S(x+1,y-1)?4:0;
   gp.moveTo(x0-el,y0-5);gp.lineTo(x0+T+er,y0-5);gp.lineTo(x0+T+er,y0+7);gp.lineTo(x0+T,y0+7);for(let s=2;s>=0;s--)gp.arc(x0+s*12+6,y0+7,6,0,Math.PI);gp.lineTo(x0-el,y0+7);gp.closePath();
   hp.rect(x0-el,y0-5,T+el+er,4)}
 sh(g,true,3,5,8,.38);g.fillStyle=th.grass[0];g.fill(gp);sh(g,false);g.fillStyle=th.grass[1];g.fill(hp);
 // planks
 for(let y=0;y<ROWS;y++)for(let x=0;x<L.w;x++)if(G[y][x]==='-'){const x0=x*T,y0=y*T;const lft=G[y][x-1]!=='-',rgt=G[y][x+1]!=='-';sh(g,true,4,7,10,.38);g.beginPath();if(g.roundRect)g.roundRect(x0-(lft?2:.5),y0-2,T+(lft?2:.5)+(rgt?2:.5),12,[lft?5:0,rgt?5:0,rgt?5:0,lft?5:0]);else g.rect(x0,y0-2,T,12);g.fillStyle=th.plank;g.fill();sh(g,false);
   g.strokeStyle=shade(th.plank,-.2);g.lineWidth=1;g.beginPath();g.moveTo(x0,y0+3);g.lineTo(x0+T,y0+3+(R()-.5)*2);g.moveTo(x0+4,y0+7);g.lineTo(x0+T-4,y0+7);g.stroke();if(lft)pin(g,x0+5,y0+4);if(rgt)pin(g,x0+T-5,y0+4)}
 // decorations
 for(const[x,y]of tops){if(y===0||G[y-1][x]!==' ')continue;const x0=x*T,y0=y*T-5;const r=R();
   if(r<.16){for(let k=0;k<5;k++){const gx=x0+R()*T;sh(g,true,1,2,3,.3);poly(g,[[gx-2.5,y0+1],[gx+(R()-.5)*3,y0-8-R()*7],[gx+2.5,y0+1]],th.grass[k%2?0:1])}}
   else if(r<.32){const fx=x0+8+R()*20,fh=10+R()*10,fc=th.flowers[R()*th.flowers.length|0];sh(g,false);g.strokeStyle=shade(th.grass[0],-.3);g.lineWidth=2;g.beginPath();g.moveTo(fx,y0+2);g.lineTo(fx,y0-fh);g.stroke();sh(g,true,2,3,4,.3);for(let k=0;k<5;k++){const a=k*1.2566;circ(g,fx+Math.cos(a)*4,y0-fh+Math.sin(a)*4,3.4,fc)}sh(g,false);circ(g,fx,y0-fh,2.4,'#ffbf3f')}
   else if(r<.42){const mx=x0+10+R()*16,mh=8+R()*6;sh(g,true,2,3,4,.3);rrect(g,mx-2.5,y0-mh,5,mh+2,2,'#fff0dc');g.beginPath();g.moveTo(mx-9,y0-mh+1);g.quadraticCurveTo(mx,y0-mh-13,mx+9,y0-mh+1);g.closePath();g.fillStyle=th.dark?'#ff7fb0':'#ff5a5a';g.fill();sh(g,false);circ(g,mx-3,y0-mh-4,1.6,'#fff');circ(g,mx+3,y0-mh-3,1.3,'#fff')}}
 sh(g,false);paperize(g,W,VH);return c}

/* ---------- sky hangers, curtains, valance ---------- */
function cloudSt(col,i){return st('cloud'+col+i,150,60,75,52,g=>{ish(g,true);g.beginPath();g.moveTo(-68,0);g.arc(-44,-14,24,Math.PI,Math.PI*1.6);g.arc(-8,-28,30,Math.PI*1.1,Math.PI*1.9);g.arc(34,-16,26,Math.PI*1.3,Math.PI*2.05);g.lineTo(68,0);g.closePath();g.fillStyle=col;g.fill();ish(g,false);g.beginPath();g.moveTo(-60,0);g.lineTo(60,0);g.lineTo(54,-5);g.lineTo(-56,-5);g.fillStyle=shade(col,-.1);g.fill()})}
const sunSt=()=>st('sun',90,90,45,45,g=>{ish(g,true);for(let i=0;i<12;i++){const a=i/12*6.283;poly(g,[[Math.cos(a-.14)*24,Math.sin(a-.14)*24],[Math.cos(a)*42,Math.sin(a)*42],[Math.cos(a+.14)*24,Math.sin(a+.14)*24]],i%2?'#ffbf3f':'#ffd23f')}circ(g,0,0,26,'#ffd23f');ish(g,false);circ(g,-4,-4,18,'#ffe27a');
 circ(g,-8,-3,2.4,'#2b1d1a');circ(g,6,-3,2.4,'#2b1d1a');g.strokeStyle='#2b1d1a';g.lineWidth=2;g.beginPath();g.arc(-1,3,6,.3,Math.PI-.3);g.stroke();ell(g,-14,4,3.5,2,'#ff9a76');ell(g,12,4,3.5,2,'#ff9a76')});
const moonSt=()=>st('moon',70,70,35,35,g=>{ish(g,true);circ(g,0,0,30,'#fff3c4');ish(g,false);g.globalCompositeOperation='destination-out';circ(g,14,-8,26,'#000');g.globalCompositeOperation='source-over';circ(g,-16,-2,2.2,'#2b1d1a');g.strokeStyle='#2b1d1a';g.lineWidth=1.8;g.beginPath();g.arc(-14,8,4,.4,Math.PI-.4);g.stroke()});
const tinyStarSt=(c)=>st('ts'+c,30,30,15,15,g=>{ish(g,true);g.beginPath();for(let i=0;i<10;i++){const r=i%2?5:12,a=i*Math.PI/5-Math.PI/2;g.lineTo(Math.cos(a)*r,Math.sin(a)*r)}g.closePath();g.fillStyle=c;g.fill()});
let CURTAIN=null,VALANCE=null;
function paintCurtain(){R=mulberry(9);const w=560,h=VH,c=mk(w,h),g=c.getContext('2d');for(let x=0;x<w;x++){const s=Math.sin(x/w*6.283*7.5);const l=s>0?Math.pow(s,.6):-Math.pow(-s,.6);g.fillStyle=l>0?shade('#b3203b',l*.22):shade('#b3203b',l*.5);g.fillRect(x,0,1,h)}
 const hy=h-46;g.fillStyle='#8a1530';g.fillRect(0,hy-4,w,4);g.fillStyle='#e8b94a';g.fillRect(0,hy,w,14);g.fillStyle='#c4922c';g.fillRect(0,hy+10,w,4);for(let x=6;x<w;x+=16){circ(g,x,hy+22,5,'#e8b94a');circ(g,x-1.5,hy+20.5,1.8,'#fff3c0')}
 paperize(g,w,h,1);return c}
function paintValance(){const c=mk(VW,70),g=c.getContext('2d');const p=new Path2D();p.moveTo(0,0);p.lineTo(VW,0);p.lineTo(VW,30);for(let x=VW;x>0;x-=60)p.arc(x-30,30,30,0,Math.PI);p.closePath();
 sh(g,true,0,8,14,.5);g.fillStyle='#9e1a35';g.fill(p);sh(g,false);g.save();g.clip(p);for(let x=0;x<VW;x+=60){const gr=g.createLinearGradient(x,0,x+60,0);gr.addColorStop(0,'rgba(0,0,0,.18)');gr.addColorStop(.5,'rgba(255,255,255,.08)');gr.addColorStop(1,'rgba(0,0,0,.18)');g.fillStyle=gr;g.fillRect(x,0,60,70)}g.restore();
 g.strokeStyle='#e8b94a';g.lineWidth=4;g.beginPath();g.moveTo(VW,24);for(let x=VW;x>0;x-=60)g.arc(x-30,24,26,0,Math.PI);g.stroke();g.fillStyle='#e8b94a';g.fillRect(0,4,VW,5);
 for(let x=0;x<=VW;x+=60){rrect(g,x-3,24,6,14,2,'#e8b94a');circ(g,x,42,5,'#c4922c');circ(g,x-1.5,40.5,1.8,'#fff3c0')}paperize(g,VW,70,1);return c}
