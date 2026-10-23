/* Dibujo de cada fotograma: mundo, jugador, luces, HUD y telón */
'use strict';
/* ================= render ================= */
const DK=mk(VW,VH),dk=DK.getContext('2d');
const VIGN=(()=>{const c=mk(VW,VH),g=c.getContext('2d');const gr=g.createRadialGradient(VW/2,VH*.45,VH*.3,VW/2,VH/2,VW*.62);gr.addColorStop(0,'rgba(255,255,255,0)');gr.addColorStop(1,'rgba(60,20,40,.42)');g.fillStyle=gr;g.fillRect(0,0,VW,VH);return c})();
function worldMatrix(){const m=new DOMMatrix();if(shake>0)m.translateSelf((Math.random()-.5)*shake,(Math.random()-.5)*shake);let z=1;
 if(state==='win'&&star){const k=Math.min(1,winT/1.1),e=1-Math.pow(1-k,3);z=1+.35*e;const fx=star.x+17-camX,fy=star.y+17;m.translateSelf(lerp(fx,VW/2,e),lerp(fy,VH/2,e));m.scaleSelf(z,z);m.translateSelf(-fx,-fy)}
 m.translateSelf(-camX,0);return{m,z}}
function drawWorld(g,t){
 g.drawImage(LAY.sky,camX,0);
 for(const h of hangers){const x=camX+h.x-camX*h.f;if(x<camX-120||x>camX+VW+120)continue;const a=Math.sin(t*1.1+h.ph)*h.amp;const ay=-12;const ex=x+Math.sin(a)*h.len,ey=ay+Math.cos(a)*h.len;
   g.strokeStyle='rgba(40,25,30,.55)';g.lineWidth=1.2;g.beginPath();g.moveTo(x,ay);g.lineTo(ex,ey);g.stroke();blit(g,h.s,ex,ey-h.s.oy-6,{rot:-a*.6})}
 g.drawImage(LAY.far,camX*.88,0);g.drawImage(LAY.mid,camX*.7,0);g.drawImage(LAY.near,camX*.42,0);g.drawImage(LAY.ter,0,0);
 for(const e of ents){if(!e.alive)continue;if(e.x+e.w<camX-80||e.x>camX+VW+80)continue;
  if(e.t==='m'){const k=Math.floor(e.ph*10)%8;const q=1+Math.sin(e.ph*20)*.1;blit(g,ladySt(k),e.x+e.w/2,e.y+e.h,{flip:e.vx>0?-1:1,sy:q,sx:2-q})}
  else if(e.t==='b'){const cx=e.x+e.w/2,cy=e.y+e.h/2;g.strokeStyle='rgba(40,25,30,.45)';g.lineWidth=1;g.beginPath();g.moveTo(cx,TOPBAR-10);g.lineTo(cx,cy-12);g.stroke();const q=1+Math.sin(t*14+e.ph)*.12;blit(g,beeSt(Math.floor(t*28)%4),cx,cy,{flip:e.dir,sy:q,sx:2-q})}
  else if(e.t==='s')blit(g,spikeSt(),e.x+e.w/2,e.y+e.h);
  else if(e.t==='o'){const bob=Math.sin(t*3+e.ph)*3;const q=Math.sin(t*5+e.ph)*.1;blit(g,craneSt(e.ci),e.x+12,e.y+14+bob,{rot:Math.sin(t*2+e.ph)*.12,sx:1+q,sy:1-q})}
  else if(e.t==='c'){if(e.lit){g.save();g.globalCompositeOperation='lighter';const lx=e.x+14,ly=e.y+20,r=46+Math.sin(t*4)*4;const lg=g.createRadialGradient(lx,ly,2,lx,ly,r);lg.addColorStop(0,'rgba(255,190,90,.5)');lg.addColorStop(1,'rgba(255,190,90,0)');g.fillStyle=lg;g.fillRect(lx-r,ly-r,r*2,r*2);g.restore()}const pw=e.popT!==undefined?Math.sin(e.popT*24)*Math.exp(-e.popT*5)*.45:0;blit(g,lanternSt(e.lit?1:0),e.x+2,e.y+e.h,{rot:Math.sin(t*1.5+e.x)*.02,sy:1+pw,sx:1-pw*.6})}
  else if(e.t==='^'){const k=e.sqT===undefined?9:e.sqT;const w=Math.sin(k*26)*Math.exp(-k*5);blit(g,springSt(0),e.x+16,e.y+e.h,{sy:1-w*.6,sx:1+w*.45})}
  else if(e.t==='*'){const cx=e.x+17,cy=e.y+17+Math.sin(t*2.2)*4;g.strokeStyle='#e8b94a';g.lineWidth=1.5;g.beginPath();g.moveTo(cx,TOPBAR-10);g.lineTo(cx,cy-24);g.stroke();
    g.save();g.globalCompositeOperation='lighter';const r=80+Math.sin(t*3)*8;const lg=g.createRadialGradient(cx,cy,4,cx,cy,r);lg.addColorStop(0,'rgba(255,214,110,.55)');lg.addColorStop(1,'rgba(255,214,110,0)');g.fillStyle=lg;g.fillRect(cx-r,cy-r,r*2,r*2);
    g.translate(cx,cy);g.rotate(t*.4);g.globalAlpha=.18;g.fillStyle='#fff3c0';for(let i=0;i<10;i++){g.rotate(.628);g.beginPath();g.moveTo(0,0);g.lineTo(-9,-110);g.lineTo(9,-110);g.closePath();g.fill()}g.restore();
    blit(g,starSt(),cx,cy,{rot:Math.sin(t*1.5)*.18,sx:1+Math.sin(t*5)*.09,sy:1-Math.sin(t*5)*.09})}}
 if(P&&state!=='menu'&&P.dead===0)drawPlayer(g,t);
 drawList(g,parts);
 g.drawImage(LAY.fg,-camX*.3,0)}
function drawPlayer(g,t){if(P.inv>0&&P.drop===0&&((t*16|0)%2))return;const s=playerSticker(P,t);let x=P.x+P.w/2,y=P.y+P.h;
 if(P.drop>0){const k=P.drop/.7;const off=k*k*320;y-=off;g.strokeStyle='rgba(40,25,30,.55)';g.lineWidth=1.2;g.beginPath();g.moveTo(x,TOPBAR-10);g.lineTo(x,y-56);g.stroke()}
 if(TH.dark){g.save();g.globalCompositeOperation='lighter';const lg=g.createRadialGradient(x,y-28,4,x,y-28,110);lg.addColorStop(0,'rgba(255,220,150,.25)');lg.addColorStop(1,'rgba(255,220,150,0)');g.fillStyle=lg;g.fillRect(x-110,y-138,220,220);g.restore()}
 blit(g,s,x,y,{flip:P.face,sx:P.sx,sy:P.sy});
 if(P.atk>0){const k=1-P.atk/ATK,a1=-2.7+(1-Math.pow(1-k,3))*3.7,a0=Math.max(-2.7,a1-1.7);g.save();g.translate(x+P.face*6,y-21);g.scale(P.face,1);
   g.globalAlpha=(1-k)*.9;g.fillStyle='#fffaf0';g.beginPath();g.arc(0,0,50,a0,a1);g.arc(0,0,30,a1,a0,true);g.closePath();g.fill();
   g.globalAlpha=(1-k)*.8;g.strokeStyle='#2b1d1a';g.lineWidth=1.6;g.setLineDash([5,4]);g.beginPath();g.arc(0,0,44,a0+.2,a1);g.stroke();g.setLineDash([]);g.globalAlpha=1;g.restore()}}
function drawLights(g,m,t){if(!TH.dark){g.save();g.globalCompositeOperation='multiply';g.drawImage(VIGN,0,0);g.restore();
   if(P&&state!=='menu'){const p=m.transformPoint(new DOMPoint(P.x+P.w/2,P.y));g.save();g.globalCompositeOperation='lighter';const lg=g.createRadialGradient(p.x,p.y,10,p.x,p.y,220);lg.addColorStop(0,'rgba(255,240,200,.16)');lg.addColorStop(1,'rgba(255,240,200,0)');g.fillStyle=lg;g.fillRect(0,0,VW,VH);g.restore()}return}
 dk.setTransform(1,0,0,1,0,0);dk.globalCompositeOperation='source-over';dk.clearRect(0,0,VW,VH);dk.fillStyle=`rgba(6,8,30,${TH.dark})`;dk.fillRect(0,0,VW,VH);dk.globalCompositeOperation='destination-out';
 const hole=(x,y,r,s)=>{const p=m.transformPoint(new DOMPoint(x,y));const rr=r*m.a;const lg=dk.createRadialGradient(p.x,p.y,0,p.x,p.y,rr);lg.addColorStop(0,`rgba(0,0,0,${s})`);lg.addColorStop(.55,`rgba(0,0,0,${s*.6})`);lg.addColorStop(1,'rgba(0,0,0,0)');dk.fillStyle=lg;dk.fillRect(p.x-rr,p.y-rr,rr*2,rr*2)};
 if(P&&state!=='menu'&&P.dead===0){const px=P.x+P.w/2,py=P.y+P.h/2;hole(px,py,190,1);const p=m.transformPoint(new DOMPoint(px,py));dk.fillStyle='rgba(0,0,0,.28)';dk.beginPath();dk.moveTo(VW*.18,0);dk.lineTo(VW*.18+60,0);dk.lineTo(p.x+70,p.y+40);dk.lineTo(p.x-70,p.y+40);dk.closePath();dk.fill()}
 for(const e of ents){if(!e.alive)continue;if(e.x<camX-200||e.x>camX+VW+200)continue;if(e.t==='c')hole(e.x+14,e.y+20,e.lit?170:50,e.lit?1:.5);else if(e.t==='o')hole(e.x+10,e.y+10,44,.7);else if(e.t==='*')hole(e.x+17,e.y+17,220,1)}
 for(const a of amb)if(TH.amb==='firefly'){dk.setTransform(1,0,0,1,0,0);const lg=dk.createRadialGradient(a.x,a.y,0,a.x,a.y,26);lg.addColorStop(0,'rgba(0,0,0,.5)');lg.addColorStop(1,'rgba(0,0,0,0)');dk.fillStyle=lg;dk.fillRect(a.x-26,a.y-26,52,52)}
 g.drawImage(DK,0,0);g.save();g.globalCompositeOperation='multiply';g.globalAlpha=.6;g.drawImage(VIGN,0,0);g.restore()}
function drawAmb(g,t){for(const a of amb){if(TH.amb==='firefly'){const fl=.5+.5*Math.sin(a.ph*3);g.save();g.globalCompositeOperation='lighter';const lg=g.createRadialGradient(a.x,a.y,0,a.x,a.y,12);lg.addColorStop(0,`rgba(246,241,154,${.9*fl})`);lg.addColorStop(1,'rgba(246,241,154,0)');g.fillStyle=lg;g.fillRect(a.x-12,a.y-12,24,24);g.restore()}
 else{g.save();g.translate(a.x,a.y);g.rotate(a.rot);g.scale(1,Math.cos(a.flip));if(TH.amb==='leaf'){ell(g,0,0,a.r*1.7,a.r*.8,a.col);g.strokeStyle=shade(a.col,-.3);g.lineWidth=.8;g.beginPath();g.moveTo(-a.r*1.6,0);g.lineTo(a.r*1.6,0);g.stroke()}else{g.fillStyle=a.col;g.fillRect(-a.r,-a.r*.7,a.r*2,a.r*1.4)}g.restore()}}}
function drawHUD(g,t){hudPop*=.9;heartPop*=.9;for(let i=0;i<3;i++){const hp=heartPop*Math.sin(heartPop*14);blit(g,heartSt(i<P.hp?1:0),64+i*32,TOPBAR+30,{rot:Math.sin(t*2+i)*.06,sx:1+hp*.4,sy:1-hp*.4})}
 const cp=hudPop;blit(g,craneSt(0),180,TOPBAR+33,{sx:1+cp*.45,sy:1+cp*.45,rot:cp*.4});g.font='24px "Lilita One", sans-serif';g.textBaseline='middle';g.lineJoin='round';g.lineWidth=5;g.strokeStyle='#fff4e0';const tx=`${gotC} / ${totalC}`;g.strokeText(tx,202,TOPBAR+31);g.fillStyle='#2b1d1a';g.fillText(tx,202,TOPBAR+31);
 if(muted){g.font='800 13px Nunito, sans-serif';g.strokeText('Sonido apagado (M)',64,TOPBAR+60);g.fillText('Sonido apagado (M)',64,TOPBAR+60)}
 if(titleT<3.6){let y;if(titleT<.8)y=lerp(-80,130,easeBack(titleT/.8));else if(titleT<2.8)y=130;else y=lerp(130,-90,easeIO((titleT-2.8)/.8));const sw=Math.sin(t*2)*.03;const s=signSt(levelIdx);
   g.strokeStyle='rgba(40,25,30,.6)';g.lineWidth=1.4;g.beginPath();g.moveTo(VW/2-140,0);g.lineTo(VW/2-140+Math.sin(sw)*40,y-34);g.moveTo(VW/2+140,0);g.lineTo(VW/2+140+Math.sin(sw)*40,y-34);g.stroke();blit(g,s,VW/2+Math.sin(sw)*40,y,{rot:sw})}}
function drawCurtains(g,t){const c=easeIO(cur.c);const gw=34+Math.sin(t*1.3)*1.5;const w=lerp(gw,VW/2+28,c);
 g.save();sh(g,true,6*DS,0,16*DS,.5);g.drawImage(CURTAIN,0,0,CURTAIN.width,CURTAIN.height,0,0,w,VH);sh(g,true,-6*DS,0,16*DS,.5);g.save();g.translate(VW,0);g.scale(-1,1);g.drawImage(CURTAIN,0,0,CURTAIN.width,CURTAIN.height,0,0,w,VH);g.restore();g.restore();
 if(c<.15){for(const x of[w-6,VW-w+6]){rrect(g,x-10,300,20,10,5,'#e8b94a');circ(g,x,316,6,'#c4922c')}}
 if(cur.c>.5&&(state==='menu'||state==='done'||state==='busy')){g.save();g.globalCompositeOperation='lighter';const a=(cur.c-.5)*2;const sx=VW/2+Math.sin(t*.6)*40;const lg=g.createRadialGradient(sx,VH*.45,20,sx,VH*.45,330);lg.addColorStop(0,`rgba(255,226,170,${.32*a})`);lg.addColorStop(1,'rgba(255,226,170,0)');g.fillStyle=lg;g.fillRect(0,0,VW,VH);
   g.globalAlpha=.07*a;g.fillStyle='#fff1cc';g.beginPath();g.moveTo(VW*.5-40,0);g.lineTo(VW*.5+40,0);g.lineTo(sx+260,VH);g.lineTo(sx-260,VH);g.closePath();g.fill();g.restore()}
 g.drawImage(VALANCE,0,-6)}
function render(){const g=ctx,t=time;g.setTransform(1,0,0,1,0,0);g.fillStyle='#1a0f1c';g.fillRect(0,0,cv.width,cv.height);
 const base=new DOMMatrix([dpr*sc,0,0,dpr*sc,dpr*ox,dpr*oy]);g.setTransform(base);g.save();g.beginPath();g.rect(0,0,VW,VH);g.clip();
 const{m,z}=worldMatrix();DS=dpr*sc*z;
 if(L&&cur.c<.999){g.setTransform(base.multiply(m));drawWorld(g,t);g.setTransform(base);DS=dpr*sc;drawAmb(g,t);drawLights(g,m,t);
   if(state==='win'){const k=Math.min(1,winT/1.2);g.save();g.globalCompositeOperation='lighter';g.globalAlpha=.22*k;const cx=VW/2,cy=VH/2;g.translate(cx,cy);g.rotate(winT*.3);for(let i=0;i<16;i++){g.rotate(Math.PI/8);g.fillStyle=i%2?'#ffe9a8':'#ffd0e0';g.beginPath();g.moveTo(0,0);g.lineTo(-60,-900);g.lineTo(60,-900);g.closePath();g.fill()}g.restore()}
   if(P&&(state==='play'||state==='paused'||state==='win'))drawHUD(g,t)}
 DS=dpr*sc;drawCurtains(g,t);drawList(g,sconf);g.restore()}
