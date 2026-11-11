// Helpers, copied unchanged from the helpers section of pack-rip.html.
// Importing this module builds each theme's card list (t.cards) from the data.
import { T } from '../data/game.js'

function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const fx=v=>Math.round(v*10)/10;
const hsl=(h,s,l)=>`hsl(${Math.round(((h%360)+360)%360)} ${Math.round(s)}% ${Math.round(l)}%)`;
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const PWR=[[8,39],[30,58],[50,74],[70,89],[90,99]];
T.forEach((t,ti)=>{
  t.i=ti;t.cards=[];
  t.d.forEach((s,ri)=>s.split(';').forEach(g=>{const[k,ns]=g.split(':');ns.split(',').forEach(n=>t.cards.push({n,k,ri,t}))}));
  t.cards.forEach((c,i)=>{c.i=i;c.key=t.id+':'+i;const p=PWR[c.ri];c.pw=p[0]+Math.floor(rng(hash(c.n)+7)()*(p[1]-p[0]+1))});
});
const TOTAL=T.reduce((n,t)=>n+t.cards.length,0);

export { hash, rng, fx, hsl, esc, PWR, TOTAL }
