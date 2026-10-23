/* Temas visuales y mapas de los 3 actos */
'use strict';
/* ================= themes & levels ================= */
const THEMES=[
 {act:'Acto I',name:'El Bosque de Cartulina',sky:['#bfe8e0','#f6f2d4'],bands:['#d5efe4','#e6f3dc','#eef4d6'],hills:['#a6dbbd','#84c8a8'],mid:['#5cb393','#469d81'],near:['#2f7f6c','#246858'],trunk:'#8a5a3c',grass:['#8fd16a','#b5e38d'],body:['#d39463','#bd7d50','#e6ad7d'],stone:'#c78a5d',plank:'#cf9f65',fg:'#1d5a4b',flowers:['#ff6b6b','#ffd166','#ffffff','#b28dff'],cloud:'#ffffff',amb:'leaf',dark:0,music:.34,scale:[0,2,4,7,9,12,14,16]},
 {act:'Acto II',name:'Atardecer Recortado',sky:['#ffd9a6','#ff9e8f'],bands:['#ffc69a','#ffb391','#ffa48e'],hills:['#f6ad86','#ec907c'],mid:['#d66e7d','#bf5a73'],near:['#8c3e6a','#723158'],trunk:'#6b3a4a',grass:['#ffd166','#ffe7a3'],body:['#e07a5f','#c8634b','#f2977b'],stone:'#d06c55',plank:'#be8457',fg:'#56204a',flowers:['#ffffff','#7ad1c1','#ff6b9a','#ffe08a'],cloud:'#ffe6da',amb:'petal',dark:0,bigSun:true,music:.3,scale:[0,3,5,7,10,12,15,17]},
 {act:'Acto III',name:'La Noche del Farolillo',sky:['#141a45','#2f3f86'],bands:['#1a2256','#1f2a62','#25336f'],hills:['#2a3d7e','#233470'],mid:['#1c2a60','#172352'],near:['#111a3e','#0d1433'],trunk:'#2a2350',grass:['#3fc1ae','#7fe0d1'],body:['#5b4f99','#4a4082','#7064b0'],stone:'#544a8e',plank:'#8070a8',fg:'#080d24',flowers:['#ffe08a','#9fe8ff','#ff9fd0','#ffffff'],cloud:'#3a4a8a',amb:'firefly',dark:.74,music:.42,scale:[0,3,5,7,10,12,14,15]},
];
const LEVELS=[
 {w:110,build({f,p,a,row}){
   f(0,22,12);a(3,11,'P');row(6,9,10,'o');a(15,11,'m');p(18,9,4);row(18,21,8,'o');
   f(25,40,12);f(33,36,11);f(37,40,10);a(28,11,'m');a(30,11,'c');row(33,35,9,'o');row(26,27,10,'o');
   f(44,58,12);p(47,9,3,'-');row(47,49,8,'o');a(52,11,'m');a(55,7,'b');row(42,43,9,'o');
   f(62,109,12);p(64,9,3);p(69,7,3);row(69,71,6,'o');a(72,11,'s');a(73,11,'s');a(67,11,'m');row(60,61,9,'o');
   a(78,11,'c');a(81,11,'m');f(84,109,11);f(88,109,10);a(86,10,'m');row(90,93,8,'o');a(97,5,'*');}},
 {w:130,build({f,p,a,row}){
   f(0,14,12);a(2,11,'P');row(5,8,10,'o');a(10,11,'m');
   f(18,26,12);p(21,9,3);row(21,23,8,'o');a(26,11,'^');p(28,5,5);row(28,32,4,'o');
   f(31,46,12);a(33,11,'c');a(36,8,'b');a(40,11,'m');a(42,7,'b');a(44,11,'s');a(45,11,'s');row(37,39,9,'o');
   f(50,52,10);row(50,52,8,'o');
   f(56,70,12);a(58,11,'c');a(60,11,'m');a(64,11,'m');p(61,9,5,'-');row(61,65,8,'o');a(67,6,'b');
   f(71,80,10);a(75,9,'s');a(78,9,'m');p(82,9,2);row(82,83,8,'o');
   f(84,100,12);a(86,11,'c');a(88,11,'^');p(90,4,4);row(90,93,3,'o');a(94,11,'m');a(98,11,'m');
   f(101,129,12);a(104,8,'b');f(108,129,11);f(112,129,10);a(110,10,'m');row(113,115,9,'o');a(119,5,'*');}},
 {w:145,build({f,p,a,row}){
   f(0,13,12);a(2,11,'P');row(6,9,10,'o');
   p(16,10,3);p(21,8,3);p(26,10,3);row(21,23,7,'o');a(23,5,'b');row(16,18,9,'o');
   f(31,44,12);a(33,11,'c');a(37,11,'m');a(39,11,'s');a(41,11,'m');
   f(45,52,10);a(49,9,'m');row(46,48,8,'o');
   f(57,70,12);a(58,11,'c');a(60,11,'s');a(61,11,'s');a(62,11,'s');p(59,9,5);row(59,63,8,'o');a(66,7,'b');a(68,11,'m');
   a(70,11,'^');p(73,4,6);row(73,78,3,'o');p(74,10,2);
   f(80,96,12);a(82,11,'c');a(84,11,'m');a(88,11,'m');a(92,11,'m');a(90,5,'b');p(85,9,6,'-');row(85,90,8,'o');
   f(100,104,11);row(101,103,9,'o');f(108,112,10);row(109,111,8,'o');
   f(116,144,12);a(118,7,'b');a(120,11,'s');a(121,11,'s');a(124,11,'m');f(126,144,11);f(129,144,10);a(134,5,'*');}},
];
function buildGrid(i){const d=LEVELS[i];const g=Array.from({length:ROWS},()=>Array(d.w).fill(' '));
 d.build({f:(x0,x1,top)=>{for(let x=x0;x<=x1;x++)for(let y=top;y<ROWS;y++)g[y][x]='#'},p:(x,y,len,ch='=')=>{for(let k=0;k<len;k++)g[y][x+k]=ch},a:(x,y,ch)=>{g[y][x]=ch},row:(x0,x1,y,ch)=>{for(let x=x0;x<=x1;x++)g[y][x]=ch}});
 return{w:d.w,grid:g}}
