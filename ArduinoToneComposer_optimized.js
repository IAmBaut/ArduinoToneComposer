function e(){this.l=!1;this.i=null;this.u=void 0;this.h=1;this.s=this.v=0;this.j=null}function f(a){if(a.l)throw new TypeError("Generator is already running");a.l=!0}e.prototype.m=function(a){this.u=a};e.prototype.o=function(a){this.j={A:a,B:!0};this.h=this.v||this.s};e.prototype["return"]=function(a){this.j={"return":a};this.h=this.s};function g(a,b,c){a.h=c;return{value:b}}function k(a){this.g=new e;this.C=a}
k.prototype.m=function(a){f(this.g);if(this.g.i)return l(this,this.g.i.next,a,this.g.m);this.g.m(a);return m(this)};function n(a,b){f(a.g);var c=a.g.i;if(c)return l(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.g["return"]);a.g["return"](b);return m(a)}k.prototype.o=function(a){f(this.g);if(this.g.i)return l(this,this.g.i["throw"],a,this.g.m);this.g.o(a);return m(this)};
function l(a,b,c,d){try{var h=b.call(a.g.i,c);if(!(h instanceof Object))throw new TypeError("Iterator result "+h+" is not an object");if(!h.done)return a.g.l=!1,h;var p=h.value}catch(z){return a.g.i=null,a.g.o(z),m(a)}a.g.i=null;d.call(a.g,p);return m(a)}function m(a){for(;a.g.h;)try{var b=a.C(a.g);if(b)return a.g.l=!1,{value:b.value,done:!1}}catch(c){a.g.u=void 0,a.g.o(c)}a.g.l=!1;if(a.g.j){b=a.g.j;a.g.j=null;if(b.B)throw b.A;return{value:b["return"],done:!0}}return{value:void 0,done:!0}}
function q(a){this.next=function(b){return a.m(b)};this["throw"]=function(b){return a.o(b)};this["return"]=function(b){return n(a,b)};this[Symbol.iterator]=function(){return this}}function r(a){function b(d){return a.next(d)}function c(d){return a["throw"](d)}new Promise(function(d,h){function p(z){z.done?d(z.value):Promise.resolve(z.value).then(b,c).then(p,h)}p(a.next())})}
var t=document.getElementById("loopbool"),u=document.getElementById("tonecompcanv"),v=document.getElementById("toneoverlay"),w=document.getElementById("gridcanv"),x=document.getElementById("volsliderinp"),y=document.getElementById("repsinp"),A=document.getElementById("notedurinp"),B=document.getElementById("combinebool"),C=document.getElementById("resetbt"),D=document.getElementById("expbt"),E=document.getElementById("impbt"),aa=document.getElementById("expcbt"),ba=document.getElementById("playbt"),
F=[130.81,138.59,146.83,155.56,164.81,174.61,185,196,207.65,220,233.08,246.94,261.63,277.18,293.66,311.13,329.63,349.23,369.99,392,415.3,440,466.16,493.88,523.25,554.37,587.33,622.25,659.25,698.46,739.99,783.99,830.61,880,932.33,987.77],ca="C C# D D# E F F# G G# A A# B".split(" "),G=.5,H=u.getContext("2d"),I=v.getContext("2d"),J=w.getContext("2d"),K=[],L=!1,M=!1,N=200,O=80;O++;var P=32*(O+1),da=O-1;B.checked=L;t.checked=!1;A.value=N.toString();y.value=da.toString();H.canvas.width=P;
J.canvas.width=P;Q();G=Number(x.value)/100;isNaN(A.value)||isNaN(parseFloat(A.value))||(N=parseInt(A.value));R();var S=0;I.fillStyle="#bbbbbb";I.fillRect(0,0,v.width,v.height);I.font="20px Arial";I.fillStyle="#222222";I.strokeStyle="#222222";I.lineWidth=2;for(var T=0;3>=T;T++){for(var U=0;11>=U;U++)I.beginPath(),I.moveTo(0,S+800*U/36),I.lineTo(P,S+800*U/36),I.stroke(),I.fillText(ca[11-U],3,S+800*(U+1)/36-5);S=800/3*T}I.moveTo(32,0);I.lineTo(32,800);I.stroke();
function R(){var a=P,b=O+1,c=0;J.font="20px Arial";J.fillStyle="#bbbbbb";J.canvas.width=a;J.beginPath();J.strokeStyle="#bbbbbb";for(var d=0;d<=b;d++)1==d?(J.lineWidth=4,J.moveTo(a/b*d,0),J.lineTo(a/b*d,800),J.stroke(),J.lineWidth=2):(J.moveTo(a/b*d,0),J.lineTo(a/b*d,800),J.stroke());for(b=0;3>=b;b++){J.strokeStyle="#bbbbbb";for(d=0;11>=d;d++)J.beginPath(),0!=d&&(J.moveTo(0,c+800*d/36),J.lineTo(a,c+800*d/36),J.stroke()),J.closePath();3!=b&&(J.beginPath(),J.lineWidth=4,J.moveTo(0,c+9600/36),J.lineTo(a,
c+9600/36),J.stroke(),J.lineWidth=2,J.closePath());c=800/3*b}}function ea(a){if(isNaN(a))b=new AudioContext,c=b.createOscillator(),c.frequency.value=0;else{var b=new AudioContext,c=b.createOscillator();c.frequency.value=F[a-1];c.type="square";vol=b.createGain();vol.gain.value=G;c.connect(vol).connect(b.destination)}c.start();return c}function V(a){M=!0;fa(W(a.slice(0,a.length)))}
function fa(a){var b,c,d;r(new q(new k(function(h){switch(h.h){case 1:if(0==a.length){h.h=3;break}0==M&&(a=[]);b=1;c=a[0];if(1<a.length&&(L||0==c))for(;a[1]==c;)b++,a.shift();return 0!=a[0]?(d=ea(a[0]),g(h,new Promise(function(p){return setTimeout(p,N*b)}),7)):g(h,new Promise(function(p){return setTimeout(p,N*b)}),5);case 7:d.stop();case 5:a.shift();h.h=1;break;case 3:1==t.checked?V(W(K)):M=!1,h.h=0}})))}
function X(a,b){H.beginPath();H.fillRect(Math.round((a+1)*P/(O+1)),Math.round(800/36*(35-b)),Math.round(P/O),Math.round(800/36));H.stroke()}function Y(a,b){H.clearRect(Math.round((a+1)*P/(O+1)),Math.round(800/36*(35-b)),Math.round(P/O),Math.round(800/36))}function Z(){P=32*(O+1);u.width=P;var a=K;H.fillStyle="#bbbbbb";for(var b=0;b<=a.length;b++)0!=a[b]&&X(b,a[b])}function W(a){for(;0==a[a.length-1];)a.pop();return a}
function Q(){M=!1;isNaN(y.value)||isNaN(parseFloat(y.value))||(O=parseInt(y.value),K.length>O&&(K=K.slice(0,O)),Z(),R())}u.addEventListener("click",function(a){var b=u.getBoundingClientRect(),c=a.clientX-b.left;a=a.clientY-b.top;cellwidthx=P/(O+1);cellwidthy=800/36;cellx=Math.floor(c/cellwidthx);celly=36-Math.floor(a/cellwidthy)-1;a=cellx;c=celly;if(0!=a)if(--a,b=a-K.length,K.length<=a){for(var d=0;d<b;d++)K.push(0);K.push(c);X(a,c)}else K[a]==c?(K[a]=0,Y(a,c)):(Y(a,K[a]),K[a]=c,X(a,c))});
B.addEventListener("click",function(){L=B.checked});C.addEventListener("click",function(){K=[];u.width=P});D.addEventListener("click",function(){var a=W(K),b=t.checked?1:0,c=B.checked?1:0,d=0;K.length<O&&(d=K.length);a="-"+d.toString()+","+N.toString()+","+b.toString()+","+c.toString()+"+"+a.toString()+"-";a=a.replace(",NaN","");prompt("Copy the following string for saving/sharing:",a)});
E.addEventListener("click",function(){var a=prompt("Please enter your exported data:","");if(""==a)K=[],u.width=P;else if(null!=a&&"-"==a[0]&&"-"==a[a.length-1]){a=a.substr(1,a.length-2);var b=a.split("+")[0].split(",");a=a.split("+")[1].split(",");if(a.length>b[0])alert("The data is not formatted correctly. Sorry.");else{"1"==b[2]?t.checked=!0:"0"==b[2]&&(t.checked=!1);"1"==b[3]?L=B.checked=!0:"0"==b[3]&&(L=B.checked=!1);O=Number(b[0]);y.value=O.toString();N=Number(b[1]);A.value=N.toString();b=a.length;
for(var c=0;c<=b;c++)a[c]=Number(a[c]),(36<a[c]||0>a[c])&&alert("The data is not formatted correctly. Sorry.");K=a;Z();R()}}});aa.addEventListener("click",function(){for(var a=K.slice(),b="";0!=a.length;){var c=1,d=a[0];if(1<a.length&&(L||0==d))for(;a[1]==d;)c++,a.shift();c*=N;b=0==d?b+("  delay("+c.toString()+");\n"):b+("  tone(buzzerpin,"+Math.round(F[d]).toString()+","+c.toString()+");\n");a.shift()}alert("void playTune(){\n  int buzzerpin=0;\n"+b+"}")});
ba.addEventListener("click",function(){0==M?V(K):M=!1});x.addEventListener("click",function(){G=Number(x.value)/100});A.addEventListener("change",function(){isNaN(A.value)||isNaN(parseFloat(A.value))||(N=parseInt(A.value))});y.addEventListener("change",function(){Q();Z()});