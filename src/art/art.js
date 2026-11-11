// Copied unchanged from pack-rip.html ("card art"). Pure functions that return SVG strings.
import { hash, rng, fx, hsl, esc } from './helpers.js'

const W='#fff',K='#14181d',GOLD='#f2c230',GD='#b8860b',MET='#cfd6dc',PAPER='#f4f1ea';
const E=(a,b,c,d,f,o='')=>`<ellipse cx="${a}" cy="${b}" rx="${c}" ry="${d}" fill="${f}" ${o}/>`;
const C=(a,b,c,f,o='')=>`<circle cx="${a}" cy="${b}" r="${c}" fill="${f}" ${o}/>`;
const B=(a,b,c,d,e,f,o='')=>`<rect x="${a}" y="${b}" width="${c}" height="${d}" rx="${e}" fill="${f}" ${o}/>`;
const P=(d,f,o='')=>`<path d="${d}" fill="${f}" ${o}/>`;
const L=(d,s,w,o='')=>`<path d="${d}" fill="none" stroke="${s}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${o}/>`;
const G=(t,s)=>`<g transform="${t}">${s}</g>`;
const mir=s=>s+G('matrix(-1 0 0 1 200 0)',s);
const op=v=>`opacity="${v}"`;
const st=(c,w)=>`stroke="${c}" stroke-width="${w}"`;
const star=(cx,cy,n,Ro,ri,f,o='',rot=-90)=>{let p='';for(let i=0;i<n*2;i++){const a=(rot+i*180/n)*Math.PI/180,q=i%2?ri:Ro;p+=fx(cx+q*Math.cos(a))+','+fx(cy+q*Math.sin(a))+' '}return`<polygon points="${p}" fill="${f}" ${o}/>`};
const sk=(x,y,s,f,o='')=>P(`M${x},${fx(y-s)}Q${x},${y} ${fx(x+s)},${y}Q${x},${y} ${x},${fx(y+s)}Q${x},${y} ${fx(x-s)},${y}Q${x},${y} ${x},${fx(y-s)}z`,f,o);
const GLASS='rgba(255,255,255,.26)';

const M={
/* drugs */
cup:x=>L('M124,74q20,0 20,15t-20,15',x.c,7)+B(70,62,54,54,9,x.c)+E(97,65,24,5,x.d)+B(76,82,6,24,3,x.l,op(.6))+L('M84,52q-7,-9 0,-18M98,52q-7,-9 0,-18M112,52q-7,-9 0,-18',W,3,op(.7)),
pill:x=>x.r()<.55?G('rotate(-35 100 80)',B(56,62,88,36,18,x.c)+P('M100,62h26a18,18 0 0 1 0,36h-26z',PAPER)+B(64,67,30,6,3,W,op(.5))+L('M100,62v36',K,1.5,op(.35))):C(100,82,37,x.d)+C(100,80,36,PAPER)+C(100,80,36,'none',st(x.c,6))+L('M76,80h48',x.d,3)+E(88,63,12,5,W,op(.9)),
bottle:x=>B(91,28,18,11,2,K)+B(93,38,14,22,2,x.d)+P('M93,58q-19,6 -19,22v38q0,8 8,8h36q8,0 8,-8v-38q0,-16 -19,-22z',x.c)+B(74,84,52,26,0,PAPER)+B(80,90,40,4,2,x.d)+B(80,98,26,4,2,x.d,op(.5))+B(79,66,5,14,2.5,W,op(.45)),
cig:x=>G('rotate(-14 100 80)',B(44,72,96,15,3,PAPER)+B(44,72,28,15,3,'#d9903d')+B(132,72,9,15,3,'#e5482d')+L('M72,72v15',GD,1.2))+L('M148,58q10,-9 0,-18t0,-18',W,3,op(.55)),
leaf:x=>{const g=hsl(105+x.r()*30,58,44),gd=hsl(120,55,26);let s=L('M100,110v20',gd,3.5);[[-80,.5],[-52,.78],[-24,.96],[0,1.08],[24,.96],[52,.78],[80,.5]].forEach(a=>s+=G(`translate(100 112) rotate(${a[0]}) scale(${a[1]})`,P('M0,0Q-10,-26 0,-64Q10,-26 0,0z',g)+L('M0,-4V-54',gd,1.3)));return s},
herb:x=>{const g=hsl(95+x.r()*50,55,45),gd=hsl(125,50,24);return G('rotate(24 100 80)',P('M100,26Q142,58 100,128Q58,58 100,26z',g)+L('M100,34V136M100,58l15,-11M100,58l-15,-11M100,78l19,-13M100,78l-19,-13M100,98l15,-11M100,98l-15,-11',gd,2))},
flask:x=>P('M90,34h20v28l28,50q5,12 -8,12h-60q-13,0 -8,-12l28,-50z',GLASS,st(W,2.5))+P('M74,92h52l12,20q5,12 -8,12h-60q-13,0 -8,-12z',x.c)+C(96,108,4,x.l)+C(110,101,3,x.l)+C(104,116,2.5,x.l)+B(86,29,28,7,3.5,W),
mush:x=>P('M88,84q-3,28 -9,44h42q-6,-16 -9,-44z','#f1e6d0')+P('M56,86q0,-48 44,-48t44,48q-44,12 -88,0z',x.c)+C(82,62,7,W,op(.9))+C(108,53,5,W,op(.9))+C(123,72,6,W,op(.9))+C(98,74,4,W,op(.9)),
crystal:x=>E(100,124,46,6,'#000',op(.3))+G('rotate(-28 80 120)',P('M70,70l12,18l-5,36h-14l-5,-36z',x.c))+G('rotate(28 120 120)',P('M130,74l12,18l-5,34h-14l-5,-34z',x.d))+P('M100,26l22,30l-8,66h-28l-8,-66z',x.l)+P('M100,26l22,30l-8,66h-14z',x.c)+L('M78,56L100,64L122,56M100,64V122',W,1.2,op(.7)),
syringe:x=>G('rotate(-40 100 80)',L('M24,80h36',MET,2.5)+B(58,68,74,24,4,GLASS,st(W,2))+B(62,72,40,16,2,x.c)+B(102,70,5,20,1,K)+B(107,77,50,6,1,MET)+B(130,62,5,36,2,MET)+B(156,67,5,26,2,MET)+L('M70,68v7M82,68v7M94,68v7M106,68v7M118,68v7',W,1.5)),
blotter:x=>{let s=B(60,40,80,80,3,PAPER);for(let i=0;i<4;i++)for(let j=0;j<4;j++)s+=B(60+i*20,40+j*20,20,20,0,[x.c,x.l,x.d][(i*3+j*2)%3],op(.9))+sk(70+i*20,50+j*20,5,W,op(.8));return G('rotate(-8 100 80)',s+L('M80,40v80M100,40v80M120,40v80M60,60h80M60,80h80M60,100h80',K,1.2,'stroke-dasharray="2 2.5" '+op(.6)))},
/* sports */
fb:x=>G('rotate(-24 100 80)',P('M44,80Q100,28 156,80Q100,132 44,80z','#7d4220')+P('M54,76Q100,38 146,76Q100,52 54,76z','#a35e30')+L('M82,80h36M84,74v12M92,74v12M100,74v12M108,74v12M116,74v12',W,2.6)+L('M63,65Q58,80 63,95M137,65Q142,80 137,95',W,4)),
soc:x=>{let s=C(100,80,40,PAPER),ln='',pt=[];for(let i=0;i<5;i++){const a=(i*72-90)*Math.PI/180,p=(q,o=0)=>fx(100+q*Math.cos(a+o))+','+fx(80+q*Math.sin(a+o));pt.push(p(15));ln+=`M${p(15)}L${p(29)}`;s+=`<polygon points="${p(29)} ${p(35,-.4)} ${p(40,-.3)} ${p(40,.3)} ${p(35,.4)}" fill="${K}"/>`}return s+`<polygon points="${pt.join(' ')}" fill="${K}"/>`+L(ln,K,2)+C(100,80,40,'none',st(K,2))+E(86,60,12,6,W,op(.5))},
base:x=>C(100,80,40,'#f6f1e4')+mir(L('M74,49Q95,80 74,111','#d8342c',2)+L('M74,49Q95,80 74,111','#d8342c',9,'stroke-dasharray="1.6 5" stroke-linecap="butt"'))+E(100,58,14,6,W,op(.6)),
bask:x=>C(100,80,40,'#e8792b')+L('M60,80h80M100,40v80M73,51Q95,80 73,109M127,51Q105,80 127,109',K,2.5)+E(86,60,12,6,W,op(.3)),
trophy:x=>mir(L('M76,50q-20,0 -18,18t20,18',GOLD,6))+P('M74,40h52v14q0,34 -26,40q-26,-6 -26,-40z',GOLD)+P('M100,40h26v14q0,34 -26,40z',GD,op(.45))+B(94,92,12,16,0,GD)+B(80,106,40,10,2,GOLD)+B(72,114,56,10,2,K)+star(100,64,5,11,4.6,W,op(.8)),
/* tech */
cable:x=>L('M100,104q0,24 -22,22t-26,14',x.d,6)+B(86,34,28,38,3,MET)+B(92,43,6,9,1,K)+B(102,43,6,9,1,K)+B(80,70,40,38,7,x.c)+B(86,78,28,4,2,x.l,op(.7))+B(86,86,18,4,2,x.l,op(.4)),
disk:x=>x.r()<.5?B(62,42,76,76,6,x.c)+B(80,42,40,26,2,MET)+B(104,46,9,18,1,x.d)+B(72,80,56,38,3,PAPER)+L('M80,92h40M80,102h40',x.d,2,op(.5)):C(100,80,40,MET)+P('M100,80L128.3,51.7A40,40 0 0 1 140,80z',x.c,op(.7))+P('M100,80L71.7,108.3A40,40 0 0 1 60,80z',x.l,op(.7))+C(100,80,40,'none',st(x.l,2))+C(100,80,13,'rgba(255,255,255,.65)')+C(100,80,5,K),
screen:x=>B(94,100,12,14,0,'#56616d')+B(78,113,44,7,3.5,'#56616d')+B(54,38,92,64,6,K)+B(59,43,82,54,2,x.d)+P('M59,97V72L80,58L98,76L118,52L141,70V97z',x.c)+C(126,54,5,x.l),
phone:x=>{let s=B(74,30,52,100,10,K)+B(78,36,44,88,6,x.d);for(let i=0;i<3;i++)for(let j=0;j<4;j++)s+=B(83+i*13,46+j*16,9,9,2.5,[x.c,x.l,W][(i+j)%3]);return s+B(92,32,16,3,1.5,'#3a4450')+B(84,112,32,7,3.5,W,op(.3))},
gamepad:x=>P('M62,56h76q16,0 20,26l2,18q-2,14 -14,6l-14,-16h-64l-14,16q-12,8 -14,-6l2,-18q4,-26 20,-26z',x.c)+B(63,71,20,7,2,K)+B(69.5,64.5,7,20,2,K)+C(126,64,5,x.l)+C(138,74,5,W)+C(114,74,5,K)+C(126,84,5,x.d)+B(92,64,16,5,2.5,x.d),
chip:x=>{let s='';for(let i=0;i<6;i++){const p=fx(73+i*10.8);s+=B(p-2.5,36,5,14,1,MET)+B(p-2.5,110,5,14,1,MET)+B(56,p-22.5,14,5,1,MET)+B(130,p-22.5,14,5,1,MET)}return s+B(66,46,68,68,7,K)+B(77,57,46,46,4,x.c)+L('M86,80h10l7,-9h12M86,91h28',x.l,2.2)+C(86,67,3,x.l)},
robot:x=>L('M100,48V34',MET,3)+C(100,31,5,x.l)+B(60,62,10,22,3,x.d)+B(130,62,10,22,3,x.d)+B(68,46,64,54,12,x.c)+B(76,56,48,24,8,K)+C(89,68,6,x.l)+C(111,68,6,x.l)+B(88,86,24,7,2,K)+L('M94,86v7M100,86v7M106,86v7',x.c,1.5)+B(82,104,36,24,6,x.d)+C(100,116,4,x.l),
rocket:x=>G('rotate(32 100 80)',P('M86,108q14,40 28,0z','#ff9a2e')+P('M93,108q7,22 14,0z','#ffe24a')+P('M78,84l-17,30h17z',x.c)+P('M122,84l17,30h-17z',x.c)+P('M100,22q22,26 22,62v24h-44v-24q0,-36 22,-62z',PAPER)+P('M100,22q12,14 17,30h-34q5,-16 17,-30z',x.c)+C(100,72,9,x.d)+C(100,72,9,'none',st(MET,3))+B(78,100,44,6,0,x.d)),
atom:x=>[0,60,120].map(a=>`<ellipse cx="100" cy="80" rx="50" ry="17" fill="none" stroke="${x.l}" stroke-width="2.5" transform="rotate(${a} 100 80)"/>`).join('')+C(100,80,11,x.c)+C(96,76,3.5,W,op(.7))+C(150,80,4.5,W)+C(75,36.7,4.5,W)+C(75,123.3,4.5,W),
/* crypto & stocks */
coin:x=>{const g=x.ri?[GOLD,GD,'#fff3b0']:['#cfd6dc','#7d8a96','#fff'];return C(100,86,40,g[1])+C(100,80,40,g[0])+C(100,80,33,'none',st(g[1],2.5))+C(100,80,36.5,'none',st(g[2],1.5)+' stroke-dasharray="1.5 4"')+`<text x="100" y="95" text-anchor="middle" font-family="Bricolage Grotesque,Arial Black,sans-serif" font-weight="800" font-size="42" fill="${g[1]}">${esc(x.n[0])}</text>`+E(84,60,14,6,W,op(.4))},
chart:x=>{let s=L('M46,122h110M46,122V38',W,1.5,op(.45)),y=98-x.ri*5+x.r()*8;for(let i=0;i<7;i++){const up=x.r()<.42+x.ri*.11,h=8+x.r()*16,ny=Math.max(46,Math.min(112,up?y-h:y+h*.8)),t=fx(Math.min(y,ny)),bh=fx(Math.max(3,Math.abs(ny-y))),col=up?'#2fd07f':'#ff4d4d',cx=60+i*14;s+=L(`M${cx},${fx(t-6)}V${fx(t+bh+6)}`,col,1.6)+B(cx-4.5,t,9,bh,1,col);y=ny}return s},
doc:x=>G('rotate(-6 100 80)',P('M68,32h46l18,18v78h-64z',PAPER)+P('M114,32v18h18z',MET)+L('M78,62h34M78,74h44M78,86h44M78,98h26',x.d,3,op(.65))+C(116,110,10,x.c)+star(116,110,5,6,2.6,W)),
bear:x=>mir(C(73,53,13,'#6f5645')+C(73,53,6,'#c9a98a'))+C(100,84,36,'#6f5645')+E(100,98,17,13,'#c9a98a')+E(100,92,7,5,K)+mir(C(86,78,4,K))+L('M100,97v6M92,106q8,5 16,0',K,2)+P('M150,56h12v30h8l-14,18l-14,-18h8z','#ff4d4d'),
bull:x=>mir(L('M76,66q-28,-4 -24,-36','#f1e6d0',8))+mir(E(66,76,11,6,'#4d3122'))+P('M72,62q28,-14 56,0q4,30 -10,52q-18,14 -36,0q-14,-22 -10,-52z','#6b4530')+E(100,108,17,12,'#c9a98a')+mir(C(93,108,3,K))+mir(C(86,82,4.5,K))+L('M92,117q8,6 16,0',GOLD,3)+P('M48,128h-12v-30h-8l14,-18l14,18h-8z','#2fd07f'),
vault:x=>B(66,118,12,10,0,K)+B(122,118,12,10,0,K)+B(58,38,84,82,8,'#56616d')+B(64,44,72,70,5,'#8b97a3')+C(100,79,25,'#56616d')+C(100,79,19,MET)+L('M100,60v38M81,79h38M86.5,65.5l27,27M113.5,65.5l-27,27',K,3)+C(100,79,7,x.c)+B(53,52,7,14,2,K)+B(53,92,7,14,2,K),
/* vapes */
juice:x=>P('M95,42l5,-20l5,20z',K)+B(90,40,20,22,3,K)+L('M90,48h20M90,54h20',W,1,op(.3))+P('M88,62h24q12,4 12,16v40q0,8 -8,8h-32q-8,0 -8,-8v-40q0,-12 12,-16z',x.c)+B(76,84,48,28,0,PAPER)+C(100,98,8,x.c)+B(80,70,5,10,2.5,W,op(.5)),
coil:x=>{let s=L('M65,102V128M135,102V128',MET,4)+B(50,72,100,16,8,PAPER);for(let i=0;i<8;i++)s+=`<ellipse cx="${65+i*10}" cy="80" rx="5" ry="24" fill="none" stroke="${i%2?x.l:x.c}" stroke-width="4.5"/>`;return s},
battery:x=>B(90,26,20,12,2,MET)+B(76,34,48,96,8,x.c)+B(76,34,48,18,8,x.d)+B(76,44,48,8,0,x.d)+P('M106,58l-18,26h11l-5,22l20,-30h-11z','#ffe24a')+B(81,58,4,60,2,W,op(.3)),
dispo:x=>G('rotate(14 100 80)',B(91,16,18,20,5,K)+B(84,32,32,100,11,x.c)+B(84,76,32,22,0,x.l,op(.6))+B(89,40,5,28,2.5,W,op(.45))+C(100,122,3,W)),
pod:x=>B(88,20,24,18,5,K)+B(82,34,36,36,6,GLASS,st(W,1.5))+B(86,50,28,18,3,x.c)+B(80,66,40,66,9,x.d)+B(80,66,40,10,0,K,op(.3))+C(100,102,4,x.l)+B(96,114,8,3,1.5,W,op(.5)),
tank:x=>B(92,20,16,24,4,K)+B(76,42,48,10,3,MET)+B(79,52,42,46,3,GLASS,st(W,1.5))+B(81,68,38,30,2,x.c,op(.85))+B(94,56,12,42,2,MET)+B(76,98,48,14,3,MET)+L('M76,105h48',K,1,op(.4))+B(88,112,24,14,2,'#8b97a3'),
mod:x=>B(95,12,10,16,3,K)+B(87,26,26,30,3,GLASS,st(W,1.5))+B(89,38,22,18,1,x.l,op(.7))+B(84,54,32,7,2,MET)+B(64,60,72,72,10,x.c)+P('M64,70q0,-10 10,-10h14v72h-14q-10,0 -10,-10z',x.d)+B(96,70,30,22,3,K)+L('M102,78h12M102,84h18',x.l,2)+C(76,76,6,MET)+B(72,96,8,5,2,MET)+B(72,106,8,5,2,MET)+B(96,100,30,22,3,'rgba(255,255,255,.14)'),
cloud:x=>(x.r()<.6?`<ellipse cx="152" cy="46" rx="11" ry="15" fill="none" stroke="#fff" stroke-width="3.5" opacity=".75"/><ellipse cx="170" cy="36" rx="6" ry="8" fill="none" stroke="#fff" stroke-width="2.5" opacity=".5"/>`:'')+`<g opacity=".94">`+C(76,90,21,W)+C(102,74,29,W)+C(130,90,20,W)+B(60,88,90,24,12,W)+`</g>`+E(100,108,34,4,x.l,op(.55)),
/* islam */
beads:x=>{let s='';for(let i=0;i<18;i++){const a=i*20*Math.PI/180;s+=C(fx(100+36*Math.sin(a)),fx(68-32*Math.cos(a)),5.2,i%3?x.c:x.l)}return s+C(100,104,6.5,GOLD)+L('M100,110v8',GOLD,3)+P('M94,117h12l3,18h-18z',GOLD)+L('M97,121v12M103,121v12',GD,1)},
palm:x=>E(100,132,36,5,'#c9a66b',op(.6))+L('M100,130q-8,-34 1,-64','#7d5a36',8)+mir(L('M100,66q-28,-20 -52,2M100,66q-22,-32 -44,-24M100,66q-6,-28 -24,-38','#2f9e55',6))+C(92,74,4.2,'#6b3a1e')+C(99,79,4.2,'#8a4b24')+C(107,75,4.2,'#6b3a1e')+C(103,84,4.2,'#8a4b24'),
crescent:x=>`<mask id="${x.id}m"><rect width="200" height="160" fill="#fff"/><circle cx="114" cy="72" r="33" fill="#000"/></mask>`+C(98,80,40,'#f6e7a8',`mask="url(#${x.id}m)"`)+star(132,66,5,11,4.6,W),
arch:x=>B(58,118,84,9,2,x.d)+P('M64,120V74q0,-34 36,-46q36,12 36,46v46h-12V76q0,-24 -24,-34q-24,10 -24,34v44z',x.c)+P('M76,120V76q0,-24 24,-34q24,10 24,34v44z',K,op(.6))+star(100,92,8,15,11.5,x.l,op(.95))+L('M100,42v14',GOLD,1.5)+C(100,60,4.5,GOLD),
lantern:x=>C(100,25,6,'none',st(GOLD,2.5))+P('M100,30l18,18h-36z',GOLD)+P('M82,48h36l8,32l-8,32h-36l-8,-32z',x.c)+P('M90,54h20l5,26l-5,26h-20l-5,-26z','#ffe9a3',op(.9))+L('M100,48v64M74,80h52',GOLD,2)+star(100,80,8,10,7.6,GOLD)+B(84,112,32,7,2,GOLD)+P('M90,119h20l-4,11h-12z',GD),
pen:x=>L('M44,116q26,-34 54,-14t54,-18',K,6)+L('M56,132q20,-8 36,0',K,3)+G('rotate(-42 120 60)',B(78,54,74,12,3,'#b0793f')+B(78,54,20,12,3,'#8a5a2b')+P('M78,54l-18,6l18,6z',K)),
star:x=>{let s=star(100,80,8,48,36.7,x.d)+star(100,80,8,41,31.4,x.c)+star(100,80,8,29,22.2,x.l,'',-67.5)+star(100,80,8,17,13,x.d)+C(100,80,5,GOLD);for(let i=0;i<8;i++){const a=(i*45+22.5)*Math.PI/180;s+=sk(fx(100+56*Math.cos(a)),fx(80+56*Math.sin(a)),4.5,GOLD)}return s},
mosque:x=>(x.r()<.55?mir(P('M60,90q0,-15 13,-20q13,5 13,20z',x.d)):'')+mir(B(42,58,12,66,1,x.d)+P('M42,58l6,-20l6,20z',x.l)+B(40,76,16,4,1,x.l))+B(62,88,76,36,0,x.c)+P('M70,88q0,-34 30,-44q30,10 30,44z',x.l)+L('M100,44V32',GOLD,2)+C(100,29,3.5,GOLD)+P('M90,124V104q0,-10 10,-14q10,4 10,14v20z',K,op(.65))+mir(P('M70,114v-10q0,-5 5,-7q5,2 5,7v10z',K,op(.5)))+B(36,122,128,5,1,x.d),
astro:x=>C(100,25,6,'none',st(GOLD,3))+C(100,82,45,GOLD)+C(100,82,39,'#23303b')+C(100,82,35,'none',st('#fff3b0',5)+' stroke-dasharray="1.5 4.6"')+C(100,74,21,'none',st(GOLD,2))+C(107,91,16,'none',st(x.l,2))+L('M100,46v72M64,82h72',GOLD,1.2,op(.6))+G(`rotate(${Math.round(x.r()*120-60)} 100 82)`,B(98,46,4,72,2,W))+C(100,82,4.5,GOLD),
kaaba:x=>E(100,128,52,6,'#000',op(.3))+P('M62,58l32,-12l46,10l-32,12z','#2c333a')+P('M62,58l46,10v56l-46,-12z','#14181d')+P('M108,68l32,-12v54l-32,14z','#1f252b')+P('M62,72l46,10v9l-46,-10z',GOLD)+P('M108,82l32,-12v9l-32,12z',GD)+P('M78,116v-22l12,2.6v22.4z',GOLD)
};
M.pillar=M.star;
const ball=(x,cx,cy,sc)=>G(`translate(${cx} ${cy}) scale(${sc}) translate(-100 -80)`,M[x.k](x));
const bat=B(95,20,10,86,5,'#c9975b')+B(96,104,8,22,3,'#8a5a2b')+B(94,124,12,5,2,'#8a5a2b');
const PROP={
 fb:[x=>L('M100,132V96M68,96h64M68,96V36M132,96V36',GOLD,5)+ball(x,100,60,.42),
     x=>P('M58,96q-4,-52 44,-54q42,2 44,44q0,10 -8,10h-30q-6,0 -8,10l-4,14h-24q-12,-4 -14,-24z',x.c)+L('M98,43q-24,10 -28,42',W,5)+C(92,90,6,K)+L('M112,97h34M118,109h24M130,97v21M146,97q0,21 -16,21h-12',MET,3.5)],
 soc:[x=>E(100,126,72,6,'#2f9e55',op(.7))+L('M58,62h84M58,76h84M58,90h84M58,104h84M72,50v72M86,50v72M100,50v72M114,50v72M128,50v72',W,1,op(.35))+L('M50,124V48h100v76',W,5)+ball(x,80,106,.4)],
 base:[x=>G('rotate(38 100 80)',bat)+G('rotate(-38 100 80)',bat)+ball(x,100,106,.4)],
 bask:[x=>B(60,24,80,56,3,PAPER,st(K,2))+B(85,48,30,22,0,'none',st('#d8342c',3))+ball(x,105,56,.4)+E(100,84,23,5,'none',st('#e8792b',4))+L('M79,86l7,26M92,89l2,24M108,89l-2,24M121,86l-7,26M83,98h34M86,110h28',W,1.6)]
};
const sport=x=>{
  if(x.ri>2)return M.trophy(x)+ball(x,100,28,.4);
  const pr=PROP[x.k],v=Math.floor(x.r()*(pr.length+1.6));
  if(v<pr.length)return pr[v](x);
  const a=Math.round(x.r()*50-25),fast=x.r()<.55;
  return(fast?L('M26,62h28M16,80h34M26,98h28',W,3.5,op(.55)):'')+G(`translate(${fast?10:0} 0) rotate(${a} 100 80)`,M[x.k](x));
};
const UPRIGHT=new Set('mosque arch kaaba screen vault chart palm astro star pillar coin beads'.split(' '));
const STRETCH=new Set('bottle juice cup flask mush crystal battery dispo pod tank mod lantern arch mosque phone screen cable herb leaf'.split(' '));

function monster(x){
  const r=x.r,el=x.k,ri=x.ri,p={fire:[14,88,56],water:[208,78,56],leaf:[128,55,46],bug:[78,62,46],bolt:[48,95,56],ice:[192,70,74],rock:[28,22,52],ghost:[266,48,62],wind:[172,42,70],dragon:[348,70,50],star:[285,70,62]}[el];
  const h=p[0]+r()*26-13,c=hsl(h,p[1],p[2]),d=hsl(h,p[1],p[2]-20),l=hsl(h,p[1]-10,Math.min(p[2]+22,92));
  const w=fx(30+r()*10+ri*2.5),hh=fx(28+r()*10+ri*2.5),cx=100,cy=92-ri,top=fx(cy-hh),bot=fx(cy+hh);
  let b='',s='';
  if(el=='wind'||el=='dragon'||el=='star'||(el=='bug'&&r()<.6)){const ws=fx(w*.5+22+ri*2);b+=mir(P(`M${fx(cx-w+8)},${cy-4}q${fx(-ws*.5)},${fx(-hh)} ${-ws},${fx(-hh*.7)}q${fx(ws*.1)},${fx(hh*.5)} ${fx(ws*.25)},${fx(hh*.55)}q${fx(-ws*.05)},${fx(hh*.3)} ${fx(ws*.3)},${fx(hh*.45)}z`,d))}
  if(el!='ghost'){const tx=fx(cx+w+18),ty=fx(cy+hh*.5-16);b+=L(`M${fx(cx+w-8)},${fx(cy+hh*.5)}q22,6 26,-16`,d,7);b+=el=='fire'?C(tx,ty-4,8,'#ff9a2e')+C(tx,ty-3,4,'#ffe24a'):el=='bolt'?P(`M${tx},${ty-14}l-8,11h6l-3,10l10,-13h-6z`,'#ffe24a'):C(tx,ty,5,l);b+=E(fx(cx-w*.45),bot-1,9,5,d)+E(fx(cx+w*.45),bot-1,9,5,d)}
  const e=el=='dragon'?2:el=='bug'?3:(el=='rock'||el=='ghost'||el=='ice')?4:Math.floor(r()*4);
  if(e==0)b+=mir(P(`M${fx(cx-w*.8)},${fx(cy-hh*.5)}l-5,-24l22,10z`,c)+P(`M${fx(cx-w*.8+2)},${fx(cy-hh*.5-4)}l-3,-13l12,6z`,l));
  if(e==1)b+=mir(C(fx(cx-w*.7),top+8,10,c)+C(fx(cx-w*.7),top+8,5,l));
  if(e==2)s+=mir(P(`M${fx(cx-w*.5)},${top+9}q-11,-14 -2,-27q2,14 13,20z`,'#f4ead2'));
  if(e==3)b+=mir(L(`M${cx-9},${top+4}q-10,-16 -20,-18`,d,3)+C(cx-30,top-14,4,l));
  s=(el=='ghost'?P(`M${fx(cx-w)},${cy}a${w},${hh} 0 0 1 ${fx(2*w)},0v${fx(hh*.85)}q${fx(-w/3)},-12 ${fx(-w*2/3)},0t${fx(-w*2/3)},0t${fx(-w*2/3)},0z`,c):el=='rock'?(()=>{let q='';for(let i=0;i<9;i++){const a=i*40*Math.PI/180,k=.86+r()*.2;q+=fx(cx+w*k*Math.cos(a))+','+fx(cy+hh*k*Math.sin(a))+' '}return`<polygon points="${q}" fill="${c}" stroke="${c}" stroke-width="7" stroke-linejoin="round"/>`})():E(cx,cy,w,hh,c))+s;
  s+=E(cx,fx(cy+hh*.38),fx(w*.6),fx(hh*.48),l,op(.75));
  if(r()<.5)s+=C(fx(cx-w*.55),fx(cy-hh*.5),4,d,op(.5))+C(fx(cx+w*.6),fx(cy-hh*.35),3,d,op(.5))+C(fx(cx+w*.4),fx(cy-hh*.62),2.5,d,op(.5));
  if(el=='fire')s+=P(`M${cx},${top-22}q15,14 7,27q-7,7 -14,0q-9,-11 7,-27z`,'#ff9a2e')+P(`M${cx},${top-10}q7,7 3,13q-3,3 -6,0q-4,-5 3,-13z`,'#ffe24a');
  if(el=='leaf')s+=L(`M${cx},${top+4}v-12`,'#2e7d3a',3)+P(`M${cx},${top-8}q-16,-14 -22,0q10,8 22,0z`,'#49b85a')+P(`M${cx},${top-8}q16,-14 22,0q-10,8 -22,0z`,'#6fd07c');
  if(el=='water')s+=P(`M${cx-10},${top+6}q10,-26 22,-22q-6,10 -2,22z`,d)+C(cx+26,top-6,3,l)+C(cx+33,top+6,2,l);
  if(el=='ice')s+=P(`M${cx-18},${top+10}l6,-22l7,19z`,'#e8fbff')+P(`M${cx-5},${top+5}l5,-28l6,27z`,W)+P(`M${cx+8},${top+8}l7,-20l5,22z`,'#e8fbff');
  if(el=='bolt')s+=P(`M${cx+4},${top-24}l-12,16h8l-4,14l14,-18h-8z`,'#ffe24a');
  if(el=='rock')s+=C(cx-12,top+5,8,d)+C(cx+9,top+2,10,d)+C(cx+6,top-1,4,l,op(.5));
  if(el=='ghost')s+=C(cx+w+8,cy-hh*.6,4,l,op(.7))+C(cx+w+16,fx(cy-hh*.9),2.5,l,op(.5));
  if(el=='wind')s+=L(`M${cx-12},${top-4}q12,-14 22,-4t-8,8`,W,3,op(.8));
  if(el=='dragon')s+=P(`M${cx-12},${top+6}l5,-14l5,12l5,-16l5,16l5,-12l4,14z`,d);
  if(el=='star')s+=E(cx,top-8,24,6,'none',st(GOLD,3))+sk(cx-w-8,top+6,5,W)+sk(cx+w+10,top+18,4,W);
  const ey=fx(cy-hh*.18),ex=fx(w*.4),er=fx(5.5+r()*3);
  if(r()<.1)s+=C(cx,ey,er+4,W)+C(cx,ey+1,er*.6+2,K)+C(cx-2,ey-2,2,W);
  else{s+=mir(C(fx(cx-ex),ey,er,W)+C(fx(cx-ex+1),fx(ey+1),fx(er*.58),K)+C(fx(cx-ex-1),fx(ey-1.5),fx(er*.22),W));if(ri>=2)s+=mir(L(`M${fx(cx-ex-er)},${fx(ey-er-4)}l${fx(er*1.9)},5`,K,2.6));else s+=mir(E(fx(cx-ex-er),fx(ey+er+4),4,2.5,'#ff8fa3',op(.6)))}
  const my=fx(cy+hh*.3);
  s+=ri>=3?P(`M${cx-11},${my-2}q11,15 22,0z`,'#3a0d14')+mir(P(`M${cx-8},${my-1}l3,7l3,-6z`,W)):L(`M${cx-7},${my}q7,7 14,0`,K,2.5)+(ri==2?mir(P(`M${cx-6},${my+2}l2.5,6l2.5,-5z`,W)):'');
  return b+s;
}

function car(x){
  const r=x.r,S={hatch:[42,158,110,93,75,46,60,104,128,3,10.5],sedan:[28,172,110,94,77,54,76,110,132,3,10.5],coupe:[28,172,110,95,80,40,84,108,132,3,11],suv:[34,166,107,86,63,38,48,108,128,2,13],classic:[26,174,110,95,80,50,72,96,112,2,11],super:[24,176,111,97,84,38,82,100,134,5,12],hyper:[22,178,111,98,86,34,80,100,138,4,12]}[x.k];
  const[x0,x1,Bo,Kb,Rf,tb,rr,rf,wb,hd,wr]=S.map((v,i)=>i>3&&i<9?fx(v+r()*4-2):v);
  const pt=[[2,80,48],[48,95,55],[212,80,50],[210,8,72],[220,12,18],[140,60,38],[24,92,54],[0,0,94],[275,55,50],[190,85,45]][Math.floor(r()*10)];
  const c=hsl(pt[0],pt[1],pt[2]),d=hsl(pt[0],pt[1],Math.max(pt[2]-18,6)),l=hsl(pt[0],pt[1],Math.min(pt[2]+24,98));
  const len=x1-x0,w1=fx(x0+len*.2),w2=fx(x1-len*.2),wy=Bo-3,k=x.k;
  let s=E(100,wy+wr,len*.52,4,'#000',op(.4));
  if(k=='hyper'||(k=='super'&&r()<.6)||(k=='coupe'&&r()<.25))s+=L(`M${x0+5},${Kb-2}v-10M${x0-2},${Kb-12}h20`,d,3.2);
  if(k=='suv')s+=L(`M${rr+4},${Rf-3}H${rf-6}`,K,3)+B(x0-5,Kb+4,6,18,3,K);
  s+=P(`M${x0},${Bo}L${x0},${Kb+5}Q${x0},${Kb} ${x0+8},${Kb-1}L${tb},${Kb-2}C${fx((tb+rr)/2)},${Rf+3} ${rr-6},${Rf} ${rr},${Rf}L${rf},${Rf}Q${rf+8},${Rf+1} ${wb},${Kb}L${x1-16},${Kb+hd}Q${x1},${Kb+hd+2} ${x1},${Kb+hd+9}L${x1},${Bo}Z`,c);
  s+=B(x0+2,Bo-6,len-4,6,2,d);
  s+=P(`M${tb+7},${Kb-2}C${fx((tb+rr)/2+4)},${Rf+6} ${rr-2},${Rf+4} ${rr+2},${Rf+4}L${rf-1},${Rf+4}Q${rf+5},${Rf+5} ${wb-6},${Kb-2}Z`,'#16222e');
  s+=L(`M${fx((rr+rf)/2)},${Rf+4}V${Kb-2}`,c,3)+L(`M${rf-6},${Rf+7}L${wb-12},${Kb-5}`,W,1.5,op(.35));
  s+=L(`M${x0+10},${Kb+4}L${x1-18},${Kb+hd+4}`,l,1.6,op(.75))+L(`M${fx((rr+rf)/2)},${Kb}V${Bo-8}`,d,1.2);
  s+=E(x1-5,Kb+hd+9,5,2.6,'#fff7c2')+B(x0,Kb+5,4,7,1,'#ff3b30');
  if(k=='super'||k=='hyper')s+=P(`M${fx(w1+wr+8)},${Kb+5}l15,-2l-4,10h-11z`,'#0c0f12');
  if(k=='hyper')s+=L(`M${x0+14},${Bo-9}H${x1-10}`,l,2.4);
  if(k=='classic')s+=B(x0-3,Bo-9,9,4,2,'#dfe5ea')+B(x1-6,Bo-9,9,4,2,'#dfe5ea');
  [w1,w2].forEach(wx=>{s+=C(wx,wy,wr+3,'#0c0f12')+C(wx,wy,wr,'#1a1d21')+(k=='classic'?C(wx,wy,wr-2.5,'none',st('#f4f1ea',2)):'')+C(wx,wy,fx(wr*.62),MET);let sp='';for(let i=0;i<5;i++){const a=(i*72-90)*Math.PI/180;sp+=`M${wx},${wy}L${fx(wx+wr*.6*Math.cos(a))},${fx(wy+wr*.6*Math.sin(a))}`}s+=L(sp,'#56616d',1.6)+C(wx,wy,2.2,K)});
  return s;
}

function motif(c){
  if(c.m)return c.m;
  const t=c.t,r=rng(hash(c.n)+1),H=t.h[hash(c.n)%t.h.length]+170+r()*60;
  const x={r,k:c.k,ri:c.ri,n:c.n,id:'a'+t.i+'_'+c.i,c:hsl(H,78,60),d:hsl(H,70,40),l:hsl(H,90,80)};
  if(c.ri==4){x.c=GOLD;x.d=GD;x.l='#fff3b0'}
  if(t.id=='monsters')return c.m=monster(x);
  if(t.id=='cars')return c.m=car(x);
  if(t.id=='sports')return c.m=sport(x);
  // same base drawing per category, so vary size, proportions and lean per card
  const j=rng(hash(c.n)+3),sx=fx(.88+j()*.22),sy=STRETCH.has(c.k)?fx(.88+j()*.22):sx,rot=UPRIGHT.has(c.k)?0:Math.round(j()*14-7);
  return c.m=G(`translate(100 82) rotate(${rot}) scale(${sx} ${sy}) translate(-100 -80)`,M[c.k](x));
}
function art(c){
  if(c.svg)return c.svg;
  const t=c.t,r=rng(hash(t.id+c.n)),id='a'+t.i+'_'+c.i,ri=c.ri,H=t.h[hash(c.n)%t.h.length]+r()*24-12;
  const rn=(a,b)=>fx(a+r()*(b-a)),pick=a=>a[Math.floor(r()*a.length)],INK=['#ffd76a','#7fe9ff','#fff','#ff8ad1','#9dffb0'];
  let d=`<radialGradient id="${id}g" cx=".5" cy=".46" r=".85"><stop offset="0" stop-color="${hsl(H,70,24)}"/><stop offset=".55" stop-color="${hsl(H+30,65,9)}"/><stop offset="1" stop-color="#02030a"/></radialGradient><radialGradient id="${id}b"><stop offset="0" stop-color="#fff8d6" stop-opacity=".95"/><stop offset=".3" stop-color="#ffb84a" stop-opacity=".6"/><stop offset="1" stop-color="#ff7a2e" stop-opacity="0"/></radialGradient>`,s='';
  // nebula clouds
  for(let i=0;i<5;i++){const h2=H+[0,70,150,210,300][i]+r()*40;d+=`<radialGradient id="${id}n${i}"><stop offset="0" stop-color="${hsl(h2,95,62)}" stop-opacity=".5"/><stop offset="1" stop-color="${hsl(h2,95,45)}" stop-opacity="0"/></radialGradient>`;s+=E(rn(0,200),rn(20,260),rn(45,90),rn(35,75),`url(#${id}n${i})`)}
  // holographic paint splashes in the corners
  [[rn(150,200),rn(0,50)],[rn(140,200),rn(215,280)],[rn(0,40),rn(200,270)]].forEach((p,i)=>{if(i==2&&r()<.5)return;let q='';const n=18,R0=rn(24,44);for(let k=0;k<n;k++){const a=k/n*6.283,rad=R0*(.45+r()*.75);q+=fx(p[0]+rad*Math.cos(a))+','+fx(p[1]+rad*Math.sin(a))+' '}s+=`<polygon points="${q}" fill="url(#holo)" opacity="${rn(.3,.55)}"/>`;for(let k=0;k<10;k++){const a=r()*6.283,rad=R0*(.8+r()*.9);s+=C(fx(p[0]+rad*Math.cos(a)),fx(p[1]+rad*Math.sin(a)),rn(.6,2.6),k%2?'#e6edf5':'url(#holo)',op(.8))}});
  // light burst behind the subject
  const bx=rn(55,145),by=rn(95,135);
  for(let i=0;i<22;i++){const a=r()*6.283,l1=rn(18,40),l2=rn(60,150);s+=L(`M${fx(bx+l1*Math.cos(a))},${fx(by+l1*Math.sin(a))}L${fx(bx+l2*Math.cos(a))},${fx(by+l2*Math.sin(a))}`,pick(INK),rn(.5,1.8),op(rn(.25,.75)))}
  s+=C(bx,by,rn(55,80),`url(#${id}b)`);
  for(let i=0;i<3;i++){const x=rn(20,180),y=rn(40,240),w=rn(30,70)*(r()<.5?-1:1);s+=L(`M${x},${y}q${fx(w)},${rn(-50,-10)} ${fx(w*1.4)},${rn(10,40)}t${fx(-w*.8)},${rn(20,50)}`,'#ffd76a',rn(.8,2.4),op(rn(.35,.7)))}
  // speed streaks and spatter
  for(let i=0;i<16;i++){const x=rn(-30,170),y=rn(180,285),len=rn(30,120);s+=L(`M${fx(x+len)},${fx(y-len*.42)}L${x},${y}`,pick(INK),rn(.6,3.2),op(rn(.2,.7)))}
  for(let i=0;i<50;i++)s+=C(rn(0,200),rn(0,280),rn(.3,1.5),pick(INK),op(rn(.4,1)));
  s+=E(100,198,74,7,'#000',op(.55));
  if(ri==4)s+=C(100,140,86,'none',st(GOLD,1.6)+' stroke-dasharray="2 6" '+op(.9));
  s+=`<g filter="url(#lit)" transform="translate(100 142) scale(${t.id=='monsters'?1.12:1.22}) translate(-100 -82)">${motif(c)}</g>`;
  for(let i=[0,2,4,7,10][ri];i>0;i--){const a=r()*6.283,q=rn(70,110);s+=sk(fx(100+q*.9*Math.cos(a)),fx(140+q*Math.sin(a)),rn(3,8),ri==4?'#fff3b0':W,op(.95))}
  return c.svg=`<svg viewBox="0 0 200 280" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${d}</defs><rect width="200" height="280" fill="url(#${id}g)"/>${s}</svg>`;
}
const emblem=t=>`<svg viewBox="10 0 180 160" aria-hidden="true"><g filter="url(#lit)">${motif(t.cards.find(c=>c.n==t.em))}</g></svg>`;

export { art, motif, emblem }
