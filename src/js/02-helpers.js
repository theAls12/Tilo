/* Utilidades de dibujo, colores y textura de papel */
'use strict';
/* ================= helpers ================= */
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
let R=Math.random;
const mk=(w,h)=>{const c=document.createElement('canvas');c.width=Math.max(1,Math.ceil(w));c.height=Math.max(1,Math.ceil(h));return c};
const lerp=(a,b,t)=>a+(b-a)*t,clamp=(v,a,b)=>v<a?a:v>b?b:v;
const easeIO=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2,easeBack=t=>{const c=1.70158,c3=c+1;return 1+c3*Math.pow(t-1,3)+c*Math.pow(t-1,2)};
function hex2(h){const n=parseInt(h.slice(1),16);return[n>>16&255,n>>8&255,n&255]}
function shade(h,a){const c=hex2(h),t=a<0?0:255,p=Math.abs(a);return'#'+c.map(v=>Math.round(v+(t-v)*p).toString(16).padStart(2,'0')).join('')}
function sh(g,on,ox=5,oy=7,b=12,a=.32){if(on){g.shadowColor=`rgba(28,8,30,${a})`;g.shadowOffsetX=ox;g.shadowOffsetY=oy;g.shadowBlur=b}else{g.shadowColor='rgba(0,0,0,0)';g.shadowBlur=0;g.shadowOffsetX=0;g.shadowOffsetY=0}}
function ish(g,on){sh(g,on,2,3,4,.3)}
function poly(g,pts,col){g.beginPath();pts.forEach((p,i)=>i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1]));g.closePath();if(col){g.fillStyle=col;g.fill()}}
function circ(g,x,y,r,col){g.beginPath();g.arc(x,y,r,0,6.2832);g.fillStyle=col;g.fill()}
function ell(g,x,y,rx,ry,col,rot=0){g.beginPath();g.ellipse(x,y,rx,ry,rot,0,6.2832);g.fillStyle=col;g.fill()}
function rrect(g,x,y,w,h,r,col){g.beginPath();if(g.roundRect)g.roundRect(x,y,w,h,r);else g.rect(x,y,w,h);g.fillStyle=col;g.fill()}

const GRAIN=(()=>{const c=mk(256,256),g=c.getContext('2d');const id=g.createImageData(256,256);for(let i=0;i<256*256;i++){const v=Math.random()<.5?0:255;id.data[i*4]=v;id.data[i*4+1]=v;id.data[i*4+2]=v;id.data[i*4+3]=Math.random()*26}g.putImageData(id,0,0);R=mulberry(3);
 for(let i=0;i<70;i++){g.strokeStyle=R()<.5?'rgba(0,0,0,.07)':'rgba(255,255,255,.12)';g.lineWidth=.7;const x=R()*256,y=R()*256,a=R()*6.3,l=6+R()*16;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.cos(a+.6)*l*.5,y+Math.sin(a+.6)*l*.5,x+Math.cos(a)*l,y+Math.sin(a)*l);g.stroke()}return c})();
function paperize(g,w,h,a=1){g.save();g.setTransform(1,0,0,1,0,0);g.globalCompositeOperation='source-atop';g.globalAlpha=a;g.fillStyle=g.createPattern(GRAIN,'repeat');g.fillRect(0,0,w,h);g.restore()}
const FILTER=(()=>{try{const c=mk(10,10),g=c.getContext('2d');if(typeof g.filter!=='string')return false;g.filter='blur(2px)';g.fillStyle='#000';g.fillRect(4,4,2,2);return g.getImageData(1,1,1,1).data[3]>0}catch(e){return false}})();
function blurC(c,px){if(!px||!FILTER)return c;const o=mk(c.width,c.height),g=o.getContext('2d');g.filter=`blur(${px}px)`;g.drawImage(c,0,0);return o}
