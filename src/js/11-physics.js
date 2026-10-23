/* Física y colisiones con el mapa */
'use strict';
/* ================= physics ================= */
function solidAt(tx,ty){if(ty<0||ty>=ROWS)return false;if(tx<0||tx>=L.w)return true;const c=L.grid[ty][tx];return c==='#'||c==='='}
function move(b,dt,oneway){let hitX=false;b.x+=b.vx*dt;let x0=Math.floor(b.x/T),x1=Math.floor((b.x+b.w-.01)/T),y0=Math.floor(b.y/T),y1=Math.floor((b.y+b.h-.01)/T);
 if(b.vx>0){for(let ty=y0;ty<=y1;ty++)if(solidAt(x1,ty)){b.x=x1*T-b.w;b.vx=0;hitX=true;break}}else if(b.vx<0){for(let ty=y0;ty<=y1;ty++)if(solidAt(x0,ty)){b.x=(x0+1)*T;b.vx=0;hitX=true;break}}
 const pb=b.y+b.h;b.y+=b.vy*dt;b.ground=false;x0=Math.floor(b.x/T);x1=Math.floor((b.x+b.w-.01)/T);y0=Math.floor(b.y/T);y1=Math.floor((b.y+b.h-.01)/T);
 if(b.vy>0){for(let tx=x0;tx<=x1;tx++){const one=oneway&&y1>=0&&y1<ROWS&&tx>=0&&tx<L.w&&L.grid[y1][tx]==='-'&&pb<=y1*T+.5;if(solidAt(tx,y1)||one){b.y=y1*T-b.h;b.vy=0;b.ground=true;break}}}
 else if(b.vy<0){for(let tx=x0;tx<=x1;tx++)if(solidAt(tx,y0)){b.y=(y0+1)*T;b.vy=0;break}}return hitX}
const ov=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
