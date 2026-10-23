/* Arte de Tilo (zorro), enemigos, estrella y objetos */
'use strict';
/* ================= character & entity art ================= */
const FOX={o:'#f28c38',od:'#cf6526',cr:'#fff4e0',te:'#2a9d8f',td:'#1d7268',br:'#5b3a29',sc:'#e63946',ink:'#2b1d1a',bl:'#ff9a8a'};
function limb(g,px,py,ang,w,len,col){g.save();g.translate(px,py);g.rotate(ang);ish(g,true);rrect(g,-w/2,-1.5,w,len,w/2,col);ish(g,false);g.restore()}
function drawFox(g,s){const F=FOX;g.save();g.translate(0,s.bob);
 // scarf tail
 ish(g,true);g.beginPath();g.moveTo(-3,-26);g.quadraticCurveTo(-14,-28+s.scarf*3,-22,-24+s.scarf*5);g.lineTo(-19,-19+s.scarf*4);g.quadraticCurveTo(-12,-21,-3,-21);g.closePath();g.fillStyle=shade(F.sc,-.15);g.fill();ish(g,false);
 // tail
 g.save();g.translate(-8,-13);g.rotate(-.35+s.tail);ish(g,true);const tp=()=>{g.beginPath();g.moveTo(2,0);g.bezierCurveTo(-8,2,-24,-6,-22,-24);g.bezierCurveTo(-14,-22,-4,-12,4,-6);g.closePath()};tp();g.fillStyle=F.o;g.fill();ish(g,false);
 g.save();tp();g.clip();circ(g,-22,-24,9,F.cr);g.beginPath();g.moveTo(2,0);g.bezierCurveTo(-8,2,-22,-4,-22,-20);g.lineTo(-17,-14);g.bezierCurveTo(-12,-6,-4,-2,2,0);g.fillStyle=F.od;g.fill();g.restore();g.restore();
 // back limbs
 limb(g,-3,-11,-s.leg,5.5,11,shade(F.br,-.1));if(!s.front)swordArm(g,s,-4);else limb(g,-5,-21,-s.arm,4.5,10,F.od);
 // tunic
 const bp=()=>{g.beginPath();g.moveTo(-8,-25);g.lineTo(8,-25);g.quadraticCurveTo(12,-16,11,-8);g.lineTo(-11,-8);g.quadraticCurveTo(-12,-16,-8,-25);g.closePath()};
 ish(g,true);bp();g.fillStyle=F.te;g.fill();ish(g,false);g.save();bp();g.clip();g.fillStyle=F.td;g.fillRect(2,-28,14,22);g.restore();
 rrect(g,-11,-14,22,3.5,1.5,F.br);rrect(g,-1.8,-14.6,3.6,4.6,1,'#e8b94a');
 limb(g,3,-11,s.leg,5.5,11,F.br);pin(g,-3,-11);pin(g,3,-11);
 // scarf band
 ish(g,true);rrect(g,-9,-28,18,5,2.5,F.sc);ish(g,false);
 // head
 g.save();g.translate(1,-30);g.rotate(s.tilt);
 ish(g,true);poly(g,[[-12,-5],[-10,-24],[-1,-11]],F.o);poly(g,[[3,-11],[12,-24],[14,-4]],F.o);ish(g,false);poly(g,[[-10,-8],[-9.5,-19],[-4,-10]],F.br);poly(g,[[5,-10],[11,-19],[12,-7]],F.br);
 const hp=()=>{g.beginPath();g.moveTo(-14,-3);g.quadraticCurveTo(-14,-15,0,-15);g.quadraticCurveTo(14,-15,15,-3);g.quadraticCurveTo(15,6,1,7);g.quadraticCurveTo(-14,6,-14,-3);g.closePath()};
 ish(g,true);hp();g.fillStyle=F.o;g.fill();ish(g,false);g.save();hp();g.clip();g.fillStyle=F.od;g.fillRect(-16,-16,7,26);
 g.beginPath();g.moveTo(-13,1);g.quadraticCurveTo(-6,-3,1,1);g.quadraticCurveTo(8,-3,16,-1);g.lineTo(16,9);g.lineTo(-14,9);g.closePath();g.fillStyle=F.cr;g.fill();g.restore();
 ish(g,true);ell(g,15,-.5,6.5,4.2,F.cr);ish(g,false);ell(g,20.5,-1.5,2.5,1.9,F.ink);circ(g,19.8,-2.2,.7,'#fff');
 if(s.blink){g.strokeStyle=F.ink;g.lineWidth=1.8;g.beginPath();g.moveTo(-1,-5);g.lineTo(4,-5);g.moveTo(8,-5);g.lineTo(12,-5);g.stroke()}
 else{ell(g,1.5,-5,2.4,3.1,F.ink);ell(g,10,-5,2.2,3,F.ink);circ(g,2.3,-6.2,1,'#fff');circ(g,10.7,-6.2,.9,'#fff')}
 g.globalAlpha=.6;ell(g,-4,1,3,1.8,F.bl);ell(g,11,3,2.6,1.6,F.bl);g.globalAlpha=1;
 g.restore();pin(g,1,-25);
 if(s.front)swordArm(g,s,5);
 g.restore()}
function swordArm(g,s,px){
const F=FOX; g.save();g.translate(px,-21);g.rotate(s.ang);
 ish(g,true);const blade=()=>{g.beginPath();g.moveTo(11,-3);g.lineTo(31,-3);g.lineTo(37,0);g.lineTo(31,3);g.lineTo(11,3);g.closePath()};blade();g.fillStyle='#f6e8c8';g.fill();ish(g,false);
 g.save();blade();g.clip();g.fillStyle='#e0c896';g.fillRect(10,0,32,4);g.restore();
 ish(g,true);rrect(g,8,-7,4,14,2,F.te);ish(g,false);rrect(g,3,-2,6,4,1.5,F.br);circ(g,2,0,2.2,'#e8b94a');
 ish(g,true);rrect(g,-2,-2.5,10,5,2.5,F.od);ish(g,false);circ(g,8,0,3.2,F.o);g.restore();pin(g,px,-21);
}
const PL={reuse:null};
function playerSticker(P,t){const run=P.ground&&Math.abs(P.vx)>25,air=!P.ground;const ph=P.anim*15;
 let ang=2.45+Math.sin(t*2)*.06+(run?Math.sin(ph)*.15:0)-(air?.3:0);if(P.atk>0){const k=1-P.atk/ATK;ang=-2.7+(1-Math.pow(1-k,3))*3.7}
 const s={bob:run?-Math.abs(Math.sin(ph))*2.5:Math.sin(t*3)*.7,leg:run?Math.sin(ph)*.8:air?-.5:0,arm:run?Math.sin(ph)*.6:air?.6:.1,tail:Math.sin(t*4+ph*.5)*.18-(air?.4:0),scarf:Math.sin(t*9),tilt:air?-.08:run?.04:Math.sin(t*1.7)*.04,ang,blink:(t%3.6)<.12,front:P.atk>0};
 if(air){s.leg=P.vy<0?-.7:.4}
 PL.reuse=makeSticker(96,90,46,72,g=>drawFox(g,s),PL.reuse);return PL.reuse}
function ladySt(k){return st('lb'+k,40,30,20,27,g=>{const a=Math.sin(k/8*6.283);g.strokeStyle='#2b1d1a';g.lineWidth=2.4;for(let i=0;i<3;i++){const lx=-7+i*7,o=(i%2?a:-a)*3;g.beginPath();g.moveTo(lx,-4);g.lineTo(lx+o,0);g.stroke()}
 ell(g,1,-5,12,4,'#2b1d1a');ish(g,true);circ(g,-11,-9,6.5,'#2b1d1a');ish(g,false);g.lineWidth=1.6;g.beginPath();g.moveTo(-13,-14);g.lineTo(-17,-20);g.moveTo(-10,-15);g.lineTo(-11,-21);g.stroke();circ(g,-17,-20,1.6,'#2b1d1a');circ(g,-11,-21,1.6,'#2b1d1a');
 circ(g,-14,-10,2.4,'#fff');circ(g,-14.6,-9.6,1.2,'#2b1d1a');circ(g,-9.5,-11,2.1,'#fff');circ(g,-10,-10.6,1,'#2b1d1a');
 const sp=()=>{g.beginPath();g.moveTo(-10,-6);g.bezierCurveTo(-10,-26,15,-26,15,-6);g.quadraticCurveTo(2,-3,-10,-6);g.closePath()};ish(g,true);sp();g.fillStyle='#e63946';g.fill();ish(g,false);g.save();sp();g.clip();g.fillStyle='#b81f30';g.fillRect(2.5,-26,16,24);g.restore();
 g.strokeStyle='#2b1d1a';g.lineWidth=1.4;g.beginPath();g.moveTo(2.5,-21);g.lineTo(2.5,-5);g.stroke();for(const[x,y,r]of[[-4,-12,2.6],[8,-15,2.4],[10,-9,2],[-1,-19,1.8],[-6,-8,1.5],[6,-21,1.5]])circ(g,x,y,r,'#2b1d1a');g.globalAlpha=.7;ell(g,-3,-18,3.6,1.8,'#fff',-.5);g.globalAlpha=1})}
function beeSt(k){return st('bee'+k,40,36,20,20,g=>{const f=Math.sin(k/4*6.283);g.globalAlpha=.78;ell(g,-3,-10,6,10,'#f2fbff',-.5+f*.45);ell(g,4,-10,5,9,'#e3f4ff',.45-f*.45);g.globalAlpha=1;
 ish(g,true);ell(g,0,0,12,9.5,'#ffd23f');ish(g,false);g.save();g.beginPath();g.ellipse(0,0,12,9.5,0,0,6.283);g.clip();g.fillStyle='#3b2a20';g.fillRect(-6,-10,4,20);g.fillRect(1,-10,4,20);g.fillStyle='rgba(0,0,0,.18)';g.fillRect(-12,2,24,8);g.restore();
 poly(g,[[-11,0],[-17,2],[-11,4]],'#3b2a20');circ(g,7,-2,2.4,'#2b1d1a');circ(g,7.8,-2.8,.9,'#fff');g.strokeStyle='#2b1d1a';g.lineWidth=1.4;g.beginPath();g.moveTo(8,-8);g.quadraticCurveTo(10,-14,13,-14);g.stroke();g.globalAlpha=.6;ell(g,8,3,2.4,1.4,'#ff9a8a');g.globalAlpha=1})}
const spikeSt=()=>st('spk',34,20,17,20,g=>{for(let i=0;i<5;i++){const x=-14+i*7;ish(g,true);poly(g,[[x-3.5,0],[x,-15+(i%2)*5],[x+3.5,0]],i%2?'#6b3a7d':'#8a4fa0');ish(g,false)}ish(g,true);rrect(g,-17,-5,34,6,3,'#4a2858');ish(g,false);ell(g,-8,-6,4,2,'#5cae6a',-.4);ell(g,9,-5,4,2,'#5cae6a',.4)});
const CR_COLS=['#ff6b6b','#4dabf7','#ffd43b','#51cf66','#cc5de8'];
function craneSt(i){const c=CR_COLS[i%5],l=shade(c,.3),d=shade(c,-.25);return st('cr'+i,40,30,20,18,g=>{ish(g,true);poly(g,[[-14,-6],[-4,4],[9,4],[17,-8],[6,0],[-4,0]],c);ish(g,false);
 poly(g,[[-4,0],[-12,-14],[-14,-12],[-6,2]],d);poly(g,[[-12,-14],[-17,-11],[-14,-12]],d);poly(g,[[6,0],[17,-8],[9,4]],d);poly(g,[[-4,0],[3,-18],[6,0]],l);poly(g,[[3,-18],[6,0],[9,-4]],c);poly(g,[[-4,4],[9,4],[6,0],[-4,0]],shade(c,-.1))})}
function starSt(){return st('star',56,56,28,28,g=>{for(let i=0;i<5;i++){const a=-Math.PI/2+i*2*Math.PI/5,a1=a-Math.PI/5,a2=a+Math.PI/5;const tip=[Math.cos(a)*25,Math.sin(a)*25],p1=[Math.cos(a1)*11,Math.sin(a1)*11],p2=[Math.cos(a2)*11,Math.sin(a2)*11];if(i===0)ish(g,true);poly(g,[[0,0],p1,tip],'#ffe27a');ish(g,false);poly(g,[[0,0],tip,p2],'#f5b53a')}
 circ(g,-4,1,2,'#2b1d1a');circ(g,4,1,2,'#2b1d1a');g.strokeStyle='#2b1d1a';g.lineWidth=1.6;g.beginPath();g.arc(0,4,2.8,.3,Math.PI-.3);g.stroke();g.globalAlpha=.6;ell(g,-8,5,2.6,1.5,'#ff9a76');ell(g,8,5,2.6,1.5,'#ff9a76');g.globalAlpha=1})}
function lanternSt(lit){return st('lan'+lit,34,62,10,60,g=>{ish(g,true);rrect(g,-2,-58,4,58,2,'#7a5238');ish(g,false);g.strokeStyle='#7a5238';g.lineWidth=2.4;g.beginPath();g.moveTo(0,-56);g.quadraticCurveTo(8,-60,12,-52);g.stroke();
 const col=lit?'#ff9f43':'#e6d8c6';ish(g,true);rrect(g,7,-50,10,4,1.5,'#3b2a30');ell(g,12,-38,10,12,col);ish(g,false);g.strokeStyle=shade(col,-.2);g.lineWidth=1.2;for(const dx of[-6,0,6]){g.beginPath();g.ellipse(12,-38,Math.abs(dx)?7:.5,11.5,0,0,6.283);g.stroke();break}
 g.beginPath();g.moveTo(5,-38);g.lineTo(19,-38);g.moveTo(4,-33);g.lineTo(20,-33);g.moveTo(4,-43);g.lineTo(20,-43);g.stroke();rrect(g,7,-28,10,4,1.5,'#3b2a30');g.strokeStyle='#e63946';g.lineWidth=2;g.beginPath();g.moveTo(12,-24);g.lineTo(12,-16);g.stroke();
 if(lit){g.globalAlpha=.8;ell(g,10,-41,3.5,5,'#fff3c4');g.globalAlpha=1}})}
function springSt(q){return st('spr'+q,36,30,18,30,g=>{const n=4,H=18*(1-q*.12),fh=H/n;ish(g,true);rrect(g,-14,-3,28,4,2,'#5b3a29');ish(g,false);for(let i=0;i<n;i++){const y0=-3-i*fh,y1=y0-fh;const l=i%2?-11:11;poly(g,[[-11,y0],[11,y0],[11+(i%2?-3:3)*0,y1],[-11,y1]],i%2?'#1c7ed6':'#4dabf7');poly(g,[[l,y0],[l,y1],[l+(l>0?3:-3),(y0+y1)/2]],'#1971c2')}
 ish(g,true);rrect(g,-15,-H-10,30,8,4,'#ffd43b');ish(g,false);rrect(g,-12,-H-9,10,3,1.5,'#fff0a8')})}
function heartSt(full){return st('h'+full,28,26,14,13,g=>{g.beginPath();g.moveTo(0,10);g.bezierCurveTo(-15,0,-10,-13,0,-5);g.bezierCurveTo(10,-13,15,0,0,10);g.closePath();ish(g,true);g.fillStyle=full?'#e63946':'#7a5a66';g.fill();ish(g,false);if(full){g.save();g.clip();g.fillStyle='#b81f30';g.fillRect(0,-14,16,26);g.restore();ell(g,-5,-3,3,2,'rgba(255,255,255,.55)',-.5)}})}
function signSt(i){const th=THEMES[i];return st('sign'+i+(fontsOK?1:0),330,92,165,46,g=>{ish(g,true);rrect(g,-165,-46,330,92,8,'#fff4e0');ish(g,false);g.strokeStyle='#e63946';g.lineWidth=3;g.setLineDash([8,5]);g.strokeRect(-154,-36,308,72);g.setLineDash([]);pin(g,-140,-34);pin(g,140,-34);
 g.textAlign='center';g.fillStyle='#b5651d';g.font='900 14px Nunito, sans-serif';g.fillText(th.act.toUpperCase(),0,-12);g.fillStyle='#2b1d1a';g.font='30px "Lilita One", sans-serif';g.fillText(th.name,0,22)})}
const scissorSt=()=>null;
