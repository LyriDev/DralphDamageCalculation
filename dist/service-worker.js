if(!self.define){let e,t={};const s=(s,i)=>(s=new URL(s+".js",i).href,t[s]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=t,document.head.appendChild(e)}else e=s,importScripts(s),t()})).then((()=>{let e=t[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(t[o])return;let r={};const c=e=>s(e,o),d={module:{uri:o},exports:r,require:c};t[o]=Promise.all(i.map((e=>d[e]||c(e)))).then((e=>(n(...e),r)))}}define(["./workbox-2b403519"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"main.js",revision:"cc4b1bcdd281f02bc78cbb29b1017c01"},{url:"main.js.LICENSE.txt",revision:"ba985f6e05c0d5e39108dd3825b470e2"}],{})}));
