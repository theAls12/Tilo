/* Estado de la partida, progreso guardado y carga de niveles */
'use strict';
/* ================= state ================= */
let state='menu',levelIdx=0,L=null,TH=THEMES[0],LAY=null,ents=[],parts=[],amb=[],hangers=[],sconf=[];
let P=null,camX=0,shake=0,freeze=0,time=0,levelTime=0,titleT=0,winT=0,gotC=0,totalC=0,spawn={x:0,y:0},star=null,fontsOK=false;
const cache={};
let progress={stars:[false,false,false]};try{const s=JSON.parse(localStorage.getItem('tilo-teatro')||'null');if(s&&Array.isArray(s.stars))progress=s}catch(e){}
function save(){try{localStorage.setItem('tilo-teatro',JSON.stringify(progress))}catch(e){}}
function prepare(i){if(cache[i])return cache[i];const lv=buildGrid(i),th=THEMES[i],mc=lv.w*T-VW;
 return cache[i]={sky:paintSky(th,11+i),far:paintFar(th,VW+mc*.12+60,21+i),mid:paintMid(th,VW+mc*.3+60,31+i),near:paintNear(th,VW+mc*.58+60,41+i),fg:paintFG(th,VW+mc*1.3+120,51+i),ter:paintTerrain(lv,th,61+i)}}
function makeHangers(i){const H=[];const th=THEMES[i];
 if(i===0){H.push({s:sunSt(),x:760,len:70,f:.03,amp:.06,ph:0,spin:true});[[110,90],[380,60],[600,120],[900,80],[1150,70]].forEach(([x,l],k)=>H.push({s:cloudSt(th.cloud,k%2),x,len:l,f:.06,amp:.05,ph:k}))}
 else if(i===1){[[150,70],[420,110],[760,60],[1050,100]].forEach(([x,l],k)=>H.push({s:cloudSt(th.cloud,k%2),x,len:l,f:.05,amp:.05,ph:k*1.3}))}
 else{H.push({s:moonSt(),x:740,len:80,f:.03,amp:.05,ph:0});[[120,60,'#ffe08a'],[280,120,'#fff3c4'],[460,40,'#ffd23f'],[600,140,'#fff3c4'],[920,70,'#ffe08a'],[1060,130,'#ffd23f'],[1200,50,'#fff3c4']].forEach(([x,l,c],k)=>H.push({s:tinyStarSt(c),x,len:l,f:.05,amp:.12,ph:k*1.7}))}
 return H}
function loadLevel(i){levelIdx=i;TH=THEMES[i];L=buildGrid(i);LAY=prepare(i);ents=[];parts=[];totalC=0;gotC=0;hangers=makeHangers(i);let ci=0;
 for(let y=0;y<ROWS;y++)for(let x=0;x<L.w;x++){const ch=L.grid[y][x],X=x*T,Y=y*T;
  if(ch==='P')spawn={x:X+6,y:Y+T-30};
  else if(ch==='m')ents.push({t:'m',x:X+4,y:Y+T-24,w:28,h:24,vx:-46,vy:0,alive:true,ph:Math.random()*6});
  else if(ch==='b')ents.push({t:'b',x:X+5,y:Y+7,w:26,h:22,bx:X+5,by:Y+7,alive:true,ph:Math.random()*6,dir:1});
  else if(ch==='s')ents.push({t:'s',x:X+3,y:Y+T-16,w:30,h:16,alive:true});
  else if(ch==='o'){const sol=c=>c==='#'||c==='='||c==='-';const yy=(y+2<ROWS&&!sol(L.grid[y+1][x])&&sol(L.grid[y+2][x]))?Y+T:Y;ents.push({t:'o',x:X+6,y:yy+6,w:24,h:26,alive:true,ci:ci++,ph:x*.7});totalC++}
  else if(ch==='c')ents.push({t:'c',x:X+8,y:Y+T-58,w:20,h:58,alive:true,lit:false});
  else if(ch==='^')ents.push({t:'^',x:X+2,y:Y+T-20,w:32,h:20,alive:true,sq:0});
  else if(ch==='*')ents.push({t:'*',x:X+1,y:Y-2,w:34,h:34,alive:true});
  if('Pmbsoc^*'.includes(ch))L.grid[y][x]=' '}
 P={x:spawn.x,y:spawn.y,w:24,h:30,vx:0,vy:0,face:1,ground:false,coyote:0,jbuf:0,atk:0,atkCd:0,inv:0,hp:3,anim:0,dead:0,hitSet:null,drop:.9,sx:1,sy:1,vsx:0,vsy:0};
 camX=0;levelTime=0;titleT=0;winT=0;star=null;amb=[];for(let k=0;k<(TH.amb==='firefly'?30:20);k++)amb.push(newAmb(true))}
function newAmb(init){const a={x:Math.random()*VW,y:init?Math.random()*VH:-10,vx:0,vy:0,r:3+Math.random()*3,ph:Math.random()*6.3,rot:Math.random()*6.3,flip:Math.random()*6.3,col:''};
 if(TH.amb==='leaf'){a.col=['#8fd16a','#ffd166','#5cb393','#ff9f43'][Math.random()*4|0];a.vy=20+Math.random()*20}
 else if(TH.amb==='petal'){a.col=['#ffffff','#ffd166','#ff8fa3','#7ad1c1'][Math.random()*4|0];a.vy=16+Math.random()*16;a.vx=-24}
 else{a.col='#f6f19a';a.y=init?VH*.2+Math.random()*VH*.75:VH;a.vy=-6;a.r=2}return a}
