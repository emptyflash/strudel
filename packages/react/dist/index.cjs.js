"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const t=require("react"),ee=require("@uiw/react-codemirror"),E=require("@codemirror/view"),A=require("@codemirror/state"),te=require("@codemirror/lang-javascript"),l=require("@lezer/highlight"),oe=require("@uiw/codemirror-themes"),ae=require("react-hook-inview"),se=require("@strudel.cycles/eval"),p=require("@strudel.cycles/tone"),B=require("@strudel.cycles/core"),ne=require("@strudel.cycles/webaudio"),M=require("@strudel.cycles/midi"),U=e=>e&&typeof e=="object"&&"default"in e?e:{default:e},d=U(t),re=U(ee),ce=oe.createTheme({theme:"dark",settings:{background:"#222",foreground:"#75baff",caret:"#ffcc00",selection:"rgba(128, 203, 196, 0.5)",selectionMatch:"#036dd626",lineHighlight:"#8a91991a",gutterBackground:"transparent",gutterForeground:"#676e95"},styles:[{tag:l.tags.keyword,color:"#c792ea"},{tag:l.tags.operator,color:"#89ddff"},{tag:l.tags.special(l.tags.variableName),color:"#eeffff"},{tag:l.tags.typeName,color:"#f07178"},{tag:l.tags.atom,color:"#f78c6c"},{tag:l.tags.number,color:"#ff5370"},{tag:l.tags.definition(l.tags.variableName),color:"#82aaff"},{tag:l.tags.string,color:"#c3e88d"},{tag:l.tags.special(l.tags.string),color:"#f07178"},{tag:l.tags.comment,color:"#7d8799"},{tag:l.tags.variableName,color:"#f07178"},{tag:l.tags.tagName,color:"#ff5370"},{tag:l.tags.bracket,color:"#a2a1a4"},{tag:l.tags.meta,color:"#ffcb6b"},{tag:l.tags.attributeName,color:"#c792ea"},{tag:l.tags.propertyName,color:"#c792ea"},{tag:l.tags.className,color:"#decb6b"},{tag:l.tags.invalid,color:"#ffffff"}]});const O=A.StateEffect.define(),ie=A.StateField.define({create(){return E.Decoration.none},update(e,s){try{for(let n of s.effects)if(n.is(O))if(n.value){const i=E.Decoration.mark({attributes:{style:"background-color: #FFCA2880"}});e=E.Decoration.set([i.range(0,s.newDoc.length)])}else e=E.Decoration.set([]);return e}catch(n){return console.warn("flash error",n),e}},provide:e=>E.EditorView.decorations.from(e)}),$=e=>{e.dispatch({effects:O.of(!0)}),setTimeout(()=>{e.dispatch({effects:O.of(!1)})},200)},L=A.StateEffect.define(),le=A.StateField.define({create(){return E.Decoration.none},update(e,s){try{for(let n of s.effects)if(n.is(L)){const i=n.value.map(u=>(u.context.locations||[]).map(({start:r,end:m})=>{const o=u.context.color||"#FFCA28";let f=s.newDoc.line(r.line).from+r.column,a=s.newDoc.line(m.line).from+m.column;const y=s.newDoc.length;return f>y||a>y?void 0:E.Decoration.mark({attributes:{style:`outline: 1.5px solid ${o};`}}).range(f,a)})).flat().filter(Boolean)||[];e=E.Decoration.set(i,!0)}return e}catch{return E.Decoration.set([])}},provide:e=>E.EditorView.decorations.from(e)}),ue=[te.javascript(),ce,le,ie];function K({value:e,onChange:s,onViewChanged:n,onSelectionChange:i,options:u,editorDidMount:r}){const m=t.useCallback(a=>{s?.(a)},[s]),o=t.useCallback(a=>{n?.(a)},[n]),f=t.useCallback(a=>{a.selectionSet&&i&&i?.(a.state.selection)},[i]);return d.default.createElement(d.default.Fragment,null,d.default.createElement(re.default,{value:e,onChange:m,onCreateEditor:o,onUpdate:f,extensions:ue}))}function Q(e){const{onEvent:s,onQuery:n,onSchedule:i,ready:u=!0,onDraw:r}=e,[m,o]=t.useState(!1),f=1,a=()=>Math.floor(p.Tone.getTransport().seconds/f),y=(w=a())=>{const R=new B.TimeSpan(w,w+1),k=n?.(new B.State(R))||[];i?.(k,w);const T=R.begin.valueOf();p.Tone.getTransport().cancel(T);const N=(w+1)*f-.5,C=Math.max(p.Tone.getTransport().seconds,N)+.1;p.Tone.getTransport().schedule(()=>{y(w+1)},C),k?.filter(h=>h.part.begin.equals(h.whole?.begin)).forEach(h=>{p.Tone.getTransport().schedule(S=>{s(S,h,p.Tone.getContext().currentTime),p.Tone.Draw.schedule(()=>{r?.(S,h)},S)},h.part.begin.valueOf())})};t.useEffect(()=>{u&&y()},[s,i,n,r,u]);const v=async()=>{o(!0),await p.Tone.start(),p.Tone.getTransport().start("+0.1")},b=()=>{p.Tone.getTransport().pause(),o(!1)};return{start:v,stop:b,onEvent:s,started:m,setStarted:o,toggle:()=>m?b():v(),query:y,activeCycle:a}}function J(e){return t.useEffect(()=>(window.addEventListener("message",e),()=>window.removeEventListener("message",e)),[e]),t.useCallback(s=>window.postMessage(s,"*"),[])}let de=()=>Math.floor((1+Math.random())*65536).toString(16).substring(1);const fe=e=>encodeURIComponent(btoa(e));function G({tune:e,autolink:s=!0,onEvent:n,onDraw:i}){const u=t.useMemo(()=>de(),[]),[r,m]=t.useState(e),[o,f]=t.useState(),[a,y]=t.useState(""),[v,b]=t.useState(),[W,w]=t.useState(!1),[R,k]=t.useState(""),[T,N]=t.useState(),C=t.useMemo(()=>r!==o||v,[r,o,v]),h=t.useCallback(g=>y(c=>c+`${c?`

`:""}${g}`),[]),S=t.useMemo(()=>{if(o&&!o.includes("strudel disable-highlighting"))return(g,c)=>i?.(g,c,o)},[o,i]),H=t.useMemo(()=>o&&o.includes("strudel hide-header"),[o]),_=t.useMemo(()=>o&&o.includes("strudel hide-console"),[o]),q=Q({onDraw:S,onEvent:t.useCallback((g,c,Z)=>{try{n?.(c),c.context.logs?.length&&c.context.logs.forEach(h);const{onTrigger:x=ne.webaudioOutputTrigger}=c.context;x(g,c,Z,1)}catch(x){console.warn(x),x.message="unplayable event: "+x?.message,h(x.message)}},[n,h]),onQuery:t.useCallback(g=>{try{return T?.query(g)||[]}catch(c){return console.warn(c),c.message="query error: "+c.message,b(c),[]}},[T]),onSchedule:t.useCallback((g,c)=>Y(g),[]),ready:!!T&&!!o}),z=J(({data:{from:g,type:c}})=>{c==="start"&&g!==u&&(q.setStarted(!1),f(void 0))}),V=t.useCallback(async(g=r)=>{if(o&&!C){b(void 0),q.start();return}try{w(!0);const c=await se.evaluate(g);q.start(),z({type:"start",from:u}),N(()=>c.pattern),s&&(window.location.hash="#"+encodeURIComponent(btoa(r))),k(fe(r)),b(void 0),f(g),w(!1)}catch(c){c.message="evaluation error: "+c.message,console.warn(c),b(c)}},[o,C,r,q,s,u,z]),Y=(g,c)=>{g.length};return{hideHeader:H,hideConsole:_,pending:W,code:r,setCode:m,pattern:T,error:v,cycle:q,setPattern:N,dirty:C,log:a,togglePlay:()=>{q.started?q.stop():V()},setActiveCode:f,activateCode:V,activeCode:o,pushLog:h,hash:R}}function P(...e){return e.filter(Boolean).join(" ")}let F=[],j;function X({view:e,pattern:s,active:n}){t.useEffect(()=>{if(e)if(s&&n){let u=function(){try{const r=p.Tone.getTransport().seconds,o=[Math.max(j||r,r-1/10),r+1/60];j=r+1/60,F=F.filter(a=>a.whole.end>r);const f=s.queryArc(...o).filter(a=>a.hasOnset());F=F.concat(f),e.dispatch({effects:L.of(F)})}catch{e.dispatch({effects:L.of([])})}i=requestAnimationFrame(u)},i=requestAnimationFrame(u);return()=>{cancelAnimationFrame(i)}}else F=[],e.dispatch({effects:L.of([])})},[s,n,e])}const ge="_container_3i85k_1",me="_header_3i85k_5",he="_buttons_3i85k_9",be="_button_3i85k_9",pe="_buttonDisabled_3i85k_17",ye="_error_3i85k_21",ve="_body_3i85k_25",D={container:ge,header:me,buttons:he,button:be,buttonDisabled:pe,error:ye,body:ve};function I({type:e}){return d.default.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",className:"sc-h-5 sc-w-5",viewBox:"0 0 20 20",fill:"currentColor"},{refresh:d.default.createElement("path",{fillRule:"evenodd",d:"M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z",clipRule:"evenodd"}),play:d.default.createElement("path",{fillRule:"evenodd",d:"M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z",clipRule:"evenodd"}),pause:d.default.createElement("path",{fillRule:"evenodd",d:"M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z",clipRule:"evenodd"})}[e])}function we({tune:e,hideOutsideView:s=!1,init:n,onEvent:i,enableKeyboard:u}){const{code:r,setCode:m,pattern:o,activeCode:f,activateCode:a,evaluateOnly:y,error:v,cycle:b,dirty:W,togglePlay:w,stop:R}=G({tune:e,autolink:!1,onEvent:i});t.useEffect(()=>{n&&y()},[e,n]);const[k,T]=t.useState(),[N,C]=ae.useInView({threshold:.01}),h=t.useRef(),S=t.useMemo(()=>((C||!s)&&(h.current=!0),C||h.current),[C,s]);return X({view:k,pattern:o,active:b.started&&!f?.includes("strudel disable-highlighting")}),t.useLayoutEffect(()=>{if(u){const H=async _=>{(_.ctrlKey||_.altKey)&&(_.code==="Enter"?(_.preventDefault(),$(k),await a()):_.code==="Period"&&(b.stop(),_.preventDefault()))};return window.addEventListener("keydown",H,!0),()=>window.removeEventListener("keydown",H,!0)}},[u,o,r,a,b,k]),d.default.createElement("div",{className:D.container,ref:N},d.default.createElement("div",{className:D.header},d.default.createElement("div",{className:D.buttons},d.default.createElement("button",{className:P(D.button,b.started?"sc-animate-pulse":""),onClick:()=>w()},d.default.createElement(I,{type:b.started?"pause":"play"})),d.default.createElement("button",{className:P(W?D.button:D.buttonDisabled),onClick:()=>a()},d.default.createElement(I,{type:"refresh"}))),v&&d.default.createElement("div",{className:D.error},v.message)),d.default.createElement("div",{className:D.body},S&&d.default.createElement(K,{value:r,onChange:m,onViewChanged:T})))}function Me(e){const{ready:s,connected:n,disconnected:i}=e,[u,r]=t.useState(!0),[m,o]=t.useState(M.WebMidi?.outputs||[]);return t.useEffect(()=>{M.enableWebMidi().then(()=>{M.WebMidi.addListener("connected",a=>{o([...M.WebMidi.outputs]),n?.(M.WebMidi,a)}),M.WebMidi.addListener("disconnected",a=>{o([...M.WebMidi.outputs]),i?.(M.WebMidi,a)}),s?.(M.WebMidi),r(!1)}).catch(a=>{if(a){console.error(a),console.warn("Web Midi could not be enabled..");return}})},[s,n,i,m]),{loading:u,outputs:m,outputByName:a=>M.WebMidi.getOutputByName(a)}}exports.CodeMirror=K;exports.MiniRepl=we;exports.cx=P;exports.flash=$;exports.useCycle=Q;exports.useHighlighting=X;exports.usePostMessage=J;exports.useRepl=G;exports.useWebMidi=Me;
