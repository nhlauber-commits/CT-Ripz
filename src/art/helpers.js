// Copied unchanged from pack-rip.html ("helpers").
export function hash(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
export function rng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
export const fx=v=>Math.round(v*10)/10;
export const hsl=(h,s,l)=>`hsl(${Math.round(((h%360)+360)%360)} ${Math.round(s)}% ${Math.round(l)}%)`;
export const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
