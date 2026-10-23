/* Lógica por fotograma: jugador, enemigos, cámara y victoria */
'use strict';
/* ================= update ================= */
const GRAV=2000,RUN=235,JUMP=770,ATK=.24;
function hurt(dir){if(P.inv>0||P.dead>0||P.drop>0||state!=='play')return;P.hp--;P.inv=1.3;P.vy=-430;P.sx=.6;P.sy=1.4;heartPop=1;P.vx=dir*280;shake=8;freeze=.07;SFX.hurt();scraps(P.x+12,P.y+10,8,['#f28c38','#2a9d8f','#fff4e0'],220);
 if(P.hp<=0){P.dead=1;const s=playerSticker(P,time);tearApart(s,P.x+P.w/2,P.y+P.h,P.face,['#f28c38','#2a9d8f','#e63946']);SFX.rip()}}
function respawn(){P.x=spawn.x;P.y=spawn.y;P.vx=0;P.vy=0;P.hp=3;P.dead=0;P.inv=1;P.atk=0;P.drop=.7;SFX.drop();camX=clamp(P.x-VW*.4,0,L.w*T-VW)}
function killEnemy(e,how){e.alive=false;freeze=.06;shake=Math.max(shake,5);const cx=e.x+e.w/2;const s=e.t==='m'?ladySt(0):beeSt(0);
 const fl=e.t==='m'?(e.vx>0?-1:1):e.dir,by=e.t==='m'?e.y+e.h:e.y+e.h/2;if(how==='stomp'){parts.push({k:'flat',s,x:cx,y:by,flip:fl,life:0,max:.13,grav:0,drag:0,vx:0,vy:0,then:()=>killEnemy2(e,s,cx)});SFX.stomp();return}killEnemy2(e,s,cx)}
function killEnemy2(e,s,cx){
 tearApart(s,cx,e.t==='m'?e.y+e.h:e.y+e.h/2,e.t==='m'?(e.vx>0?-1:1):e.dir,e.t==='m'?['#e63946','#2b1d1a','#fff4e0']:['#ffd23f','#3b2a20','#f2fbff']);confetti(parts,cx,e.y+e.h/2,10,280,{life:.8});SFX.rip()}
function update(dt){time+=dt;updCurtain(dt);for(const a of amb)updAmb(a,dt);sconf=updList(sconf,dt);
 if(state==='menu'||state==='busy'){music(dt,TH);parts=updList(parts,dt);return}
 if(state==='done'){music(dt,TH);if(Math.random()<dt*14)confetti(sconf,Math.random()*VW,-10,3,60,{grav:160,life:3.2,drag:.6,ang:Math.PI/2,spread:1});return}
 if(state!=='play'&&state!=='win')return;
 if(freeze>0){freeze-=dt;return}
 titleT+=dt;music(dt,TH);
 if(state==='win'){winT+=dt;parts=updList(parts,dt);updEnts(dt,true);if(winT>1.9&&!winClosing){winClosing=true;closeCurtain(()=>{state='done';showDone();SFX.applause();for(let i=0;i<120;i++)confetti(sconf,VW/2+(Math.random()-.5)*300,VH*.25,1,700,{life:2.6,grav:420,drag:1.2})})}return}
 levelTime+=dt;
 if(P.drop>0){P.drop-=dt;squashUpd(dt);if(P.drop<=0){P.drop=0;P.sy=.5;P.sx=1.5}updEnts(dt);parts=updList(parts,dt);camFollow(dt);return}
 if(P.dead>0){P.dead+=dt;parts=updList(parts,dt);updEnts(dt);if(P.dead>1.6)respawn();return}
 const ax=(keys.right?1:0)-(keys.left?1:0);if(ax&&ax!==P.face){P.sx=.72;P.sy=1.2}if(ax)P.face=ax;
 P.vx+=(ax*RUN-P.vx)*Math.min(1,dt*(P.ground?16:9));
 if(pressed.jump)P.jbuf=.13;P.jbuf-=dt;P.coyote=P.ground?.1:P.coyote-dt;
 if(P.jbuf>0&&P.coyote>0){P.vy=-JUMP;P.jbuf=0;P.coyote=0;P.sx=.6;P.sy=1.48;SFX.jump();confetti(parts,P.x+12,P.y+P.h,5,90,{cols:[TH.grass[0],TH.body[2]],life:.4,grav:300})}
 if(!keys.jump&&P.vy<-260)P.vy+=GRAV*dt*1.4;
 P.vy=Math.min(P.vy+GRAV*dt,920);
 const wasG=P.ground,pvy=P.vy;move(P,dt,true);
 if(P.ground&&!wasG&&pvy>300){{const k=clamp(pvy/900,.3,1);P.sx=1+.55*k;P.sy=1-.48*k}confetti(parts,P.x+12,P.y+P.h,6,120,{cols:[TH.grass[0],TH.grass[1]],life:.45,grav:300,ang:-Math.PI/2,spread:2.4})}
 squashUpd(dt);
 P.anim+=dt*(Math.abs(P.vx)/RUN);P.inv=Math.max(0,P.inv-dt);
 P.atkCd-=dt;if(pressed.atk&&P.atkCd<=0){P.atk=ATK;P.atkCd=.32;P.sx=1.35;P.sy=.8;P.hitSet=new Set();SFX.slash()}
 if(P.atk>0){P.atk-=dt;const k=1-P.atk/ATK;if(k<.75){const hb={x:P.face>0?P.x+P.w-6:P.x-46,y:P.y-18,w:52,h:P.h+24};for(const e of ents){if(!e.alive||(e.t!=='m'&&e.t!=='b'))continue;if(ov(hb,e)&&!P.hitSet.has(e)){P.hitSet.add(e);killEnemy(e,'sword')}}}}
 if(P.y>VH+50){shake=6;SFX.hurt();const hp=P.hp-1<=0?3:P.hp-1;respawn();P.hp=hp}
 updEnts(dt);parts=updList(parts,dt);camFollow(dt);shake=Math.max(0,shake-dt*30)}
let winClosing=false,hudPop=0,heartPop=0;
function squashUpd(dt){const run=P.ground&&Math.abs(P.vx)>25;let ty=1;if(P.drop>0)ty=1.15;else if(!P.ground)ty=1+clamp(Math.abs(P.vy)/2400,0,.32);else if(run)ty=1+Math.sin(P.anim*30)*.09;else ty=1+Math.sin(time*3)*.035;const tx=1/ty;
 P.vsx=(P.vsx||0)+(tx-P.sx)*520*dt;P.vsy=(P.vsy||0)+(ty-P.sy)*520*dt;const d=Math.exp(-12*dt);P.vsx*=d;P.vsy*=d;P.sx=clamp(P.sx+P.vsx*dt,.45,1.75);P.sy=clamp(P.sy+P.vsy*dt,.45,1.75)}
function camFollow(dt){const tgt=clamp(P.x+P.w/2-VW*.42+P.vx*.28,0,L.w*T-VW);camX+=(tgt-camX)*Math.min(1,dt*5)}
function updEnts(dt,frozen){for(const e of ents){if(!e.alive)continue;e.ph=(e.ph||0)+dt;
 if(e.t==='m'){e.vy=Math.min(e.vy+GRAV*dt,900);const hit=move(e,dt,true);if(hit)e.vx=-e.vx||46;
   if(e.ground){const ahead=e.vx>0?e.x+e.w+2:e.x-2;const tx=Math.floor(ahead/T),ty=Math.floor((e.y+e.h+3)/T);const plank=ty>=0&&ty<ROWS&&tx>=0&&tx<L.w&&L.grid[ty][tx]==='-';
     const spike=ents.some(s=>s.t==='s'&&ahead>s.x&&ahead<s.x+s.w&&Math.abs(s.y+s.h-(e.y+e.h))<6);if((!solidAt(tx,ty)&&!plank)||spike)e.vx=-e.vx}
   if(e.vx===0)e.vx=46;if(e.y>VH+60)e.alive=false}
 else if(e.t==='b'){e.x+=e.dir*55*dt;if(Math.abs(e.x-e.bx)>80){e.dir*=-1;e.x=e.bx+Math.sign(e.x-e.bx)*80}e.y=e.by+Math.sin(e.ph*2.6)*14}
 else if(e.t==='^'&&e.sqT!==undefined)e.sqT+=dt;
 if(e.t==='c'&&e.popT!==undefined)e.popT+=dt;
 if(frozen||!P||P.dead>0||P.drop>0||state!=='play'||!ov(P,e))continue;
 if(e.t==='m'||e.t==='b'){if(P.vy>60&&P.y+P.h-e.y<18){killEnemy(e,'stomp');P.vy=keys.jump?-680:-470;P.sy=1.5;P.sx=.62;SFX.stomp()}else hurt(P.x+P.w/2<e.x+e.w/2?-1:1)}
 else if(e.t==='s')hurt(P.vx>0?-1:1);
 else if(e.t==='o'){e.alive=false;gotC++;hudPop=1;SFX.crane();const c=CR_COLS[e.ci%5];confetti(parts,e.x+10,e.y+9,10,220,{cols:[c,'#fff4e0',shade(c,.3)],life:.6,grav:300});ring(e.x+10,e.y+9,c,30)}
 else if(e.t==='c'&&!e.lit){e.lit=true;e.popT=0;spawn={x:e.x-2,y:e.y+e.h-30};SFX.check();confetti(parts,e.x+20,e.y+20,14,220,{cols:['#ffd23f','#ff9f43','#fff4e0'],life:.9,grav:200})}
 else if(e.t==='^'&&P.vy>0&&P.y+P.h-e.y<16){P.vy=-1180;P.y=e.y-P.h;e.sqT=0;P.sy=1.7;P.sx=.5;SFX.spring();confetti(parts,e.x+16,e.y,8,180,{life:.5})}
 else if(e.t==='*')winLevel(e)}}
function updAmb(a,dt){a.ph+=dt;if(TH.amb==='firefly'){a.x+=Math.sin(a.ph*.7)*12*dt;a.y+=Math.cos(a.ph*.5)*10*dt+a.vy*dt}else{a.x+=(a.vx+Math.sin(a.ph*1.3)*22)*dt;a.y+=a.vy*dt;a.rot+=dt*2;a.flip+=dt*5}
 if(state==='play'){a.x-=(camX-(a.lc===undefined?camX:a.lc))*.85}a.lc=camX;
 if(a.y>VH+10||a.y<-20||a.x<-30||a.x>VW+30){Object.assign(a,newAmb(false));if(TH.amb==='firefly'){a.x=Math.random()*VW;a.y=VH*.3+Math.random()*VH*.6}else{a.x=Math.random()*VW*1.1;a.y=-10}a.lc=camX}}
function winLevel(e){if(state!=='play')return;state='win';winT=0;winClosing=false;star=e;SFX.star();shake=6;progress.stars[levelIdx]=true;save();
 const cx=e.x+17,cy=e.y+17;confetti(parts,cx,cy,90,700,{life:1.8,grav:380,drag:1.6});for(let i=0;i<3;i++)parts.push({k:'ring',x:cx,y:cy,c:['#ffd23f','#e63946','#2a9d8f'][i],r:260,life:-i*.15,max:1.2})}
function showDone(){const last=levelIdx===2;const m=Math.floor(levelTime/60),s=Math.floor(levelTime%60);
 $('doneSub').textContent=last?'Fin de la función':`Fin del ${THEMES[levelIdx].act}`;$('doneTitle').textContent=last?'¡Función completa, bravo!':'¡Bravo!';
 $('doneStats').textContent=`Pajaritas ${gotC} / ${totalC} · Tiempo ${m}:${String(s).padStart(2,'0')}`;$('btnNext').querySelector('.nm').textContent=last?'Volver a empezar':'Siguiente acto';
 $('done').hidden=false;showHud(false);$('btnNext').focus()}
