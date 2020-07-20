"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("atom");class t{constructor(){this.element=document.createElement("div"),this.element.classList.add("outline-view")}destroy(){this.element.remove()}getElement(){return this.element}getTitle(){return"Outline"}setOutline({tree:e,editor:t}){const n=this.getElement();n.innerHTML="";const i=document.createElement("ul");!function e({parent:t,entries:n,editor:i,level:o=0}){n.forEach(n=>{const s=document.createElement("li"),r=document.createElement("span");r.style.paddingLeft=10*o+"px",r.innerText=n.representativeName||n.plainText;const a=function(e,t){const n=document.createElement("span");n.classList.add("icon");"string"==typeof e&&e.length>0&&n.classList.add(e);let i;if("string"==typeof t&&t.length>0){let e;0===t.indexOf("type-")?(e=""+t,i=t.replace("type-","")):(e="type-"+t,i=t),n.classList.add(e)}const o=i?i.substring(0,1):"?";return n.innerHTML=`<span>${o}</span>`,n}(null==n?void 0:n.icon,null==n?void 0:n.kind);r.prepend(a),s.append(r),s.addEventListener("click",()=>{atom.workspace.paneForItem(i).activate(),i.cursors[0].setBufferPosition(n.startPosition,{autoscroll:!0})});if(n.children&&!!n.children[0]){const t=document.createElement("ul");t.addEventListener("click",e=>e.stopPropagation()),s.append(t),e({parent:t,entries:n.children,editor:i,level:o+1})}t.append(s)})}({parent:i,entries:e,editor:t}),n.append(i)}clearOutline(){this.getElement().innerHTML=""}presentStatus(e){this.clearOutline();const t=e&&function(e){const t=document.createElement("div");t.className="status";const{title:n="",description:i=""}=e;return t.innerHTML=`<h1>${n}</h1>\n  <span>${i}</span>`,t}(e);if(t){this.getElement().append(t)}}}const n={noEditor:{title:"Outline is unavailable.",description:"Open a text editor."},noProvider:{title:"Provider is unavailable",description:"Looks like a provider for this type of file is not available. Check if a relevant IDE language package is installed and has outline support, or try adding one from Atom's package registry (e.g.: ide-typescript, ide-rust, ide-css, ide-json)."}};let i,o,s,r=null,a=new class{constructor(){this.providers=[]}addProvider(t){return this.providers.push(t),new e.Disposable(()=>this.removeProvider(t))}removeProvider(e){const t=this.providers.indexOf(e);-1!==t&&this.providers.splice(t,1)}getProvider(e){const t=e.getGrammar().scopeName;return this.providers.find(e=>e.grammarScopes.includes(t))}};function l(){const e=atom.workspace.paneForItem(o);if(e)return e.destroyItem(o);const t=atom.workspace.getRightDock(),[n]=t.getPanes();n.addItem(o),n.activateItem(o),t.show()}async function c(e){var t,n;const i=e||atom.workspace.getActiveTextEditor();if(!i)return d("noEditor");const r=a.getProvider(i);if(!r)return d("noProvider");const l=i.getFileName();null===(t=s)||void 0===t||t.add("Outline: "+l);const c=await r.getOutline(i);o.setOutline({tree:c&&c.outlineTrees||[],editor:i}),null===(n=s)||void 0===n||n.clear()}function d(e){const t=n[e];o.presentStatus(t)}exports.activate=function(){i=new e.CompositeDisposable,o=new t,function(){const e=atom.commands.add("atom-workspace",{"outline:toggle":()=>l()});i.add(e)}(),function(){const e=atom.workspace.observeActiveTextEditor(async e=>{var t,n;null===(t=r)||void 0===t||null===(n=t.dispose)||void 0===n||n.call(t),await c(e),r=null==e?void 0:e.onDidChangeCursorPosition(()=>c(e))});i.add(e)}(),atom.config.get("atom-ide-outline.InitialDisplay")&&l()},exports.config={InitialDisplay:{title:"Initial Outline Display",description:"Show outline initially aftern atom loads",type:"boolean",default:!0}},exports.consumeOutlineProvider=async function(e){const t=a.addProvider(e);i.add(t),await c()},exports.consumeSignal=function(e){const t=e.create();s=t,i.add(t)},exports.deactivate=function(){i.dispose(),o.destroy()},exports.getOutline=c,exports.outlineProviderRegistry=a,exports.setStatus=d,exports.statuses=n,exports.toggleOutlineView=l;
//# sourceMappingURL=main.js.map
