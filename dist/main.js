"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("atom");function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=t(e);class o{constructor(){this.pointToElementsMap=new Map,this.element=document.createElement("div"),this.element.classList.add("outline-view")}destroy(){this.element.remove()}getElement(){return this.element}getTitle(){return"Outline"}getIconName(){return"list-unordered"}setOutline(e,t,n){const o=this.clearOutline();if(n){const e=document.createElement("div");e.innerHTML='\n        <span style = "\n          font-size: var(--editor-font-size);\n          font-family: var(--editor-font-family);\n          line-height: var(--editor-line-height);\n          color: #71844c;\n        "\n        >Large file mode</span>\n      ',o.appendChild(e)}const i=document.createElement("ul");r(i,e,t,this.pointToElementsMap,n||atom.config.get("atom-ide-outline.foldInitially")),o.appendChild(i)}clearOutline(){const e=this.getElement();return e.innerHTML="",e}presentStatus(e){this.clearOutline();const t=e&&function(e){const t=document.createElement("div");t.className="status";const{title:n="",description:o=""}=e;return t.innerHTML=`<h1>${n}</h1>\n  <span>${o}</span>`,t}(e);if(t){this.getElement().appendChild(t)}}selectAtCursorLine(e){if(!this.isVisible())return;if(i)return void(i=!1);if(void 0!==this.focusedElms)for(const e of this.focusedElms)e.toggleAttribute("cursorOn",!1);const t=e.row;if(this.focusedElms=this.pointToElementsMap.get(t),void 0!==this.focusedElms)for(const e of this.focusedElms)e.toggleAttribute("cursorOn",!0),e.scrollIntoView({block:"center"})}isVisible(){return function(e){const t=atom.workspace.paneContainerForItem(e);return void 0!==t&&("function"!=typeof t.isVisible||t.isVisible())}(this)}}let i=!1;function r(e,t,n,o,s,a=0){var l;const p=n.getTabLength(),f=16*("number"==typeof p?p:4);atom.config.get("atom-ide-outline.sortEntries")&&t.sort(((e,t)=>{const n=e.startPosition.row-t.startPosition.row;return 0===n?e.startPosition.column-e.startPosition.column:n}));for(const p of t){const t=document.createElement("li"),v=document.createElement("span");v.innerText=null!==(l=p.representativeName||p.plainText)&&void 0!==l?l:"",v.prepend(d(null==p?void 0:p.icon,null==p?void 0:p.kind)),t.appendChild(v);const m=o.get(p.startPosition.row);if(void 0!==m?(m.push(t),o.set(p.startPosition.row,m)):o.set(p.startPosition.row,[t]),t.addEventListener("click",(()=>{const e=atom.workspace.paneForItem(n);e&&(e.activate(),n.getCursors()[0].setBufferPosition(p.startPosition,{autoscroll:!0}),i=!0)}),{passive:!0}),null==p.children||null==p.children[0])v.style.paddingLeft=0!==a?f*a+"px":c+"px";else{v.style.paddingLeft=0!==a?f*a-c+"px":"0px";const e=document.createElement("ul");e.addEventListener("click",(e=>e.stopPropagation()),{passive:!0}),t.appendChild(e);const i=u(e,s);v.prepend(i),r(e,p.children,n,o,s,a+1)}e.appendChild(t)}}const s=["array","boolean","class","constant","constructor","enum","field","file","function","interface","method","module","namespace","number","package","property","string","variable"],a=new Map([["variable",""],["function",""],["namespace",""]]),l=new Map([["array","arr"],["boolean","bool"],["class","clas"],["constant","cons"],["constructor","ctor"],["enum","enum"],["field","fild"],["file","file"],["function","func"],["interface","intf"],["method","meth"],["module","mod"],["namespace","ns"],["number","num"],["package","pkg"],["property","prop"],["string","str"],["variable","var"]]);function d(e,t){const n=document.createElement("span");let o;if(n.classList.add("icon"),null==t&&null!=e&&(t=e),"string"==typeof t&&t.length>0){let e;0===t.indexOf("type-")?(e=""+t,o=t.replace("type-","")):s.includes(t)?(e="type-"+t,o=t):e=t,n.classList.add(e)}return n.innerHTML=function(e){return e?a.has(e)?`<span style="font-family: 'symbol-icons';">${a.get(e)}</span>`:l.has(e)?`<span>${l.get(e)}</span>`:`<span>${e.substring(0,3)}</span>`:"<span>•</span>"}(o),n}const c=20;function u(e,t){const n=document.createElement("button");return t?(e.hidden=!0,n.classList.add("fold","collapsed")):n.classList.add("fold","expanded"),n.addEventListener("click",(t=>{e.hidden=!e.hidden,e.hidden?(n.classList.remove("expanded"),n.classList.add("collapsed")):(n.classList.remove("collapsed"),n.classList.add("expanded")),t.stopPropagation()}),{passive:!0}),n}var p="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};var f,v=(function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.ProviderRegistry=void 0,t.ProviderRegistry=class{constructor(){this.providers=[]}addProvider(e){const t=this.providers.findIndex((t=>e.priority>t.priority));return-1===t?this.providers.push(e):this.providers.splice(t,0,e),new n.default.Disposable((()=>{this.removeProvider(e)}))}removeProvider(e){const t=this.providers.indexOf(e);-1!==t&&this.providers.splice(t,1)}getProviderForEditor(e){const t=e.getGrammar().scopeName;return this.findProvider(t)}getAllProvidersForEditor(e){const t=e.getGrammar().scopeName;return this.findAllProviders(t)}findProvider(e){for(const t of this.findAllProviders(e))return t;return null}*findAllProviders(e){for(const t of this.providers)null!=t.grammarScopes&&-1===t.grammarScopes.indexOf(e)||(yield t)}}}(f={exports:{}},f.exports),f.exports);const m={noEditor:{title:"Outline is unavailable.",description:"Open a text editor."},noProvider:{title:"Provider is unavailable",description:"Looks like a provider for this type of file is not available. Check if a relevant IDE language package is installed and has outline support, or try adding one from Atom's package registry (e.g.: atom-ide-javascript, atom-typescript, ide-python, ide-rust, ide-css, ide-json)."}};var g=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)},h="object"==typeof p&&p&&p.Object===Object&&p,y="object"==typeof self&&self&&self.Object===Object&&self,b=h||y||Function("return this")(),w=function(){return b.Date.now()},x=/\s/;var E=function(e){for(var t=e.length;t--&&x.test(e.charAt(t)););return t},P=/^\s+/;var O=function(e){return e?e.slice(0,E(e)+1).replace(P,""):e},L=b.Symbol,T=Object.prototype,k=T.hasOwnProperty,j=T.toString,C=L?L.toStringTag:void 0;var M=function(e){var t=k.call(e,C),n=e[C];try{e[C]=void 0;var o=!0}catch(e){}var i=j.call(e);return o&&(t?e[C]=n:delete e[C]),i},I=Object.prototype.toString;var S=function(e){return I.call(e)},A=L?L.toStringTag:void 0;var D=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":A&&A in Object(e)?M(e):S(e)};var F=function(e){return null!=e&&"object"==typeof e};var N=function(e){return"symbol"==typeof e||F(e)&&"[object Symbol]"==D(e)},$=/^[-+]0x[0-9a-f]+$/i,V=/^0b[01]+$/i,R=/^0o[0-7]+$/i,B=parseInt;var H=function(e){if("number"==typeof e)return e;if(N(e))return NaN;if(g(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=g(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=O(e);var n=V.test(e);return n||R.test(e)?B(e.slice(2),n?2:8):$.test(e)?NaN:+e},_=Math.max,z=Math.min;var G=function(e,t,n){var o,i,r,s,a,l,d=0,c=!1,u=!1,p=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function f(t){var n=o,r=i;return o=i=void 0,d=t,s=e.apply(r,n)}function v(e){return d=e,a=setTimeout(h,t),c?f(e):s}function m(e){var n=e-l;return void 0===l||n>=t||n<0||u&&e-d>=r}function h(){var e=w();if(m(e))return y(e);a=setTimeout(h,function(e){var n=t-(e-l);return u?z(n,r-(e-d)):n}(e))}function y(e){return a=void 0,p&&o?f(e):(o=i=void 0,s)}function b(){var e=w(),n=m(e);if(o=arguments,i=this,l=e,n){if(void 0===a)return v(l);if(u)return clearTimeout(a),a=setTimeout(h,t),f(l)}return void 0===a&&(a=setTimeout(h,t)),s}return t=H(t)||0,g(n)&&(c=!!n.leading,r=(u="maxWait"in n)?_(H(n.maxWait)||0,t):r,p="trailing"in n?!!n.trailing:p),b.cancel=function(){void 0!==a&&clearTimeout(a),d=0,o=l=i=a=void 0},b.flush=function(){return void 0===a?s:y(w())},b},W={initialDisplay:{title:"Initial Outline Display",description:"Show outline initially aftern atom loads",type:"boolean",default:!0},sortEntries:{title:"Sort entries based on the line number",description:"This option sorts the entries based on where they appear in the code.",type:"boolean",default:!0},foldInitially:{title:"Fold the entries initially",description:"If enabled, the outline entries are folded initially. This is enabled automatically in large file mode.",type:"boolean",default:!1}};const q=new e.CompositeDisposable;let U;const J=new v.ProviderRegistry;const K=atom.config.get("linter-ui-default.longLineLength")||4e3,Q=atom.config.get("linter-ui-default.largeFileLineCount")/6||3e3;function X(e){if(e.largeFileMode)return 2e4;const t=e.getLineCount();if(t>=Q)return t;{const n=e.getBuffer();for(let e=0,o=t;e<o;e++)if(n.lineLengthForRow(e)>K)return K;return 0}}let Y;function Z(){const e=atom.workspace.getActiveTextEditor();void 0!==e&&void 0!==U&&U.selectAtCursorLine(e.getCursorBufferPosition())}function ee(){void 0===U&&(U=new o);const e=atom.workspace.paneForItem(U);if(e)return void e.destroyItem(U);const t=atom.workspace.getRightDock(),[n]=t.getPanes();n.addItem(U),n.activateItem(U),t.show()}async function te(e=atom.workspace.getActiveTextEditor()){var t;if(void 0===U&&(U=new o),!U.isVisible())return;if(void 0===e)return ne("noEditor");const n=J.getProviderForEditor(e);if(!n)return ne("noProvider");const i=await n.getOutline(e);U.setOutline(null!==(t=null==i?void 0:i.outlineTrees)&&void 0!==t?t:[],e,Boolean(X(e)))}function ne(e){null==U||U.presentStatus(m[e])}exports.activate=function(){q.add(atom.commands.add("atom-workspace","outline:toggle",ee),atom.commands.add("atom-workspace","outline:reveal-cursor",Z)),function(){Y=new e.CompositeDisposable;const t=atom.workspace.observeActiveTextEditor((async e=>{var t;if(void 0===e)return;null===(t=null==Y?void 0:Y.dispose)||void 0===t||t.call(Y),await te(e);const n=X(e),o=Math.max(n/5,300),i=G(te,o);Y.add(e.onDidStopChanging((async()=>{await i(e)})),e.onDidDestroy((()=>{ne("noEditor")})))}));q.add(t)}(),atom.config.get("atom-ide-outline.initialDisplay")&&ee()},exports.config=W,exports.consumeOutlineProvider=async function(e){q.add(J.addProvider(e)),await te()},exports.deactivate=function(){var e;null===(e=null==Y?void 0:Y.dispose)||void 0===e||e.call(Y),q.dispose(),null==U||U.destroy(),U=void 0},exports.getOutline=te,exports.outlineProviderRegistry=J,exports.revealCursor=Z,exports.setStatus=ne,exports.statuses=m,exports.toggleOutlineView=ee;
//# sourceMappingURL=main.js.map
