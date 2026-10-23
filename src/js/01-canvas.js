/* Lienzo de 960x540 y escalado a la pantalla */
'use strict';
const VW=960,VH=540,T=36,ROWS=15,TOPBAR=40;
const cv=document.getElementById('game');const ctx=cv.getContext('2d');
let dpr=1,sc=1,ox=0,oy=0,DS=1;
function resize(){dpr=Math.min(2,window.devicePixelRatio||1);cv.width=Math.round(innerWidth*dpr);cv.height=Math.round(innerHeight*dpr);sc=Math.min(innerWidth/VW,innerHeight/VH);ox=(innerWidth-VW*sc)/2;oy=(innerHeight-VH*sc)/2}
addEventListener('resize',resize);resize();
