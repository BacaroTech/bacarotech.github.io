(function(e){function t(t){for(var a,c,i=t[0],u=t[1],s=t[2],b=0,p=[];b<i.length;b++)c=i[b],Object.prototype.hasOwnProperty.call(r,c)&&r[c]&&p.push(r[c][0]),r[c]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);l&&l(t);while(p.length)p.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,i=1;i<n.length;i++){var u=n[i];0!==r[u]&&(a=!1)}a&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},r={app:0},o=[];function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var s=0;s<i.length;s++)t(i[s]);var l=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},"1b93":function(e,t,n){"use strict";var a=n("7400"),r=n.n(a);r.a},"5c0b":function(e,t,n){"use strict";var a=n("9c0c"),r=n.n(a);r.a},"5f83":function(e,t,n){},7400:function(e,t,n){},"796a":function(e,t,n){},"9c0c":function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"nav",attrs:{id:"nav"}},[n("NavAnimation")],1),n("div",{staticClass:"content"},[n("router-view")],1),n("br"),n("br")])},o=[],c=n("d4ec"),i=n("262e"),u=n("2caf"),s=n("9ab4"),l=n("60a3"),b=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},p=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"about"},[n("h1",[e._v("Chi siamo?")]),n("br"),n("br"),n("br"),n("span",{staticClass:"nobody"},[e._v(" Nessuno "),n("br")]),n("br"),n("br"),n("br"),n("br"),n("br"),n("span",[e._v(" Ciao, "),n("br"),e._v("M&M. ")])])}],v=function(e){Object(i["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(c["a"])(this,n),t.apply(this,arguments)}return n}(l["c"]);v=Object(s["a"])([l["a"]],v);var f=v,m=f,d=(n("f26d"),n("2877")),h=Object(d["a"])(m,b,p,!1,null,null,null),O=h.exports,j=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("router-view")},_=[],g=n("bee2"),y=function(e){Object(i["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(c["a"])(this,n),t.apply(this,arguments)}return Object(g["a"])(n,[{key:"mounted",value:function(){console.log("Empty mounted")}}]),n}(l["c"]);y=Object(s["a"])([l["a"]],y);var k=y,C=k,S=Object(d["a"])(C,j,_,!1,null,null,null),M=S.exports,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("nav",{attrs:{role:"navigation"}},[n("div",{staticClass:"menu-hamb-container",class:e.openMenu?"menu-hamb-container-open":"menu-hamb-container-close"},[n("div",{class:e.openMenu?"menu-container-open":"menu-container-close"},[n("img",{class:e.openMenu?"icon-menu-open":"icon-menu-close",on:{click:e.menuClick}})]),n("ul",{staticClass:"menu",class:e.openMenu?"menu-open":"menu-close"},[n("li",[n("router-link",{attrs:{to:"/"}},[e._v("Home")])],1),n("li",[n("router-link",{attrs:{to:"/Reader"}},[e._v("Reader")])],1),n("li",[n("router-link",{attrs:{to:"/About"}},[e._v("About")])],1)])])])},x=[],E=function(e){Object(i["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(c["a"])(this,n),e=t.apply(this,arguments),e.openMenu=!1,e}return Object(g["a"])(n,[{key:"created",value:function(){console.log("App VUE Created")}},{key:"mounted",value:function(){console.log("Nav mounted")}},{key:"menuClick",value:function(){console.log("menu click"),this.openMenu=!this.openMenu}}]),n}(l["c"]);E=Object(s["a"])([l["a"]],E);var $=E,z=$,A=(n("d46a"),Object(d["a"])(z,w,x,!1,null,null,null)),P=A.exports,H=function(e){Object(i["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(c["a"])(this,n),t.apply(this,arguments)}return n}(l["c"]);H=Object(s["a"])([Object(l["a"])({components:{About:O,NavAnimation:P,EmptyRouterView:M}})],H);var N=H,R=N,T=(n("5c0b"),Object(d["a"])(R,r,o,!1,null,null,null)),q=T.exports,I=n("8c4f"),J=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"about"},[n("button",{staticClass:"button",on:{click:e.clickHanlder}},[e._v("Shot")]),n("h1",[e._v(e._s(e.msg))])])},L=[],Q=function(e){Object(i["a"])(n,e);var t=Object(u["a"])(n);function n(){var e;return Object(c["a"])(this,n),e=t.call(this),e.listSentences=[],e.nSentences=e.listSentences.length,e.listSentences=["Ti Amano tutti, perché hai un cuore grande","I grandi sognatori non dormono mai","Ottimo! Siete aperti al nuovo","Non è vero che ogni verità può andare bene","Custodiamo ciò che la Natura ci ha donato","Il lavoro che mi attende è ancora tutto da fare","Tu sei una persona di quelle che si incontrano quando la vita decide di farti un regalo"],e.nSentences=e.listSentences.length,e}return Object(g["a"])(n,[{key:"created",value:function(){this.msg=this.listSentences[this.nextSentence()]}},{key:"nextSentence",value:function(){return Math.floor(Math.random()*this.nSentences)}},{key:"clickHanlder",value:function(){this.msg=this.listSentences[this.nextSentence()],console.log("click "+this.msg)}}]),n}(l["c"]);Object(s["a"])([Object(l["b"])()],Q.prototype,"msg",void 0),Q=Object(s["a"])([l["a"]],Q);var V=Q,U=V,B=(n("1b93"),Object(d["a"])(U,J,L,!1,null,null,null)),D=B.exports,F=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},G=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"about"},[n("h1",[e._v("Leggerezza")]),n("p",[n("span",[e._v(" Ciao, "),n("br"),e._v("Questo è un pezzo della nostra isola. ")]),n("br"),e._v("Tutto è iniziato con questa frase: "),n("br"),n("br"),n("span",[n("b",[n("i",[e._v("L'insostenibile leggerezza dell'essere")])])]),n("br"),n("br"),n("span",[e._v(" Ciao, "),n("br"),e._v("M&M. ")])])])}],K=function(e){Object(i["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(c["a"])(this,n),t.apply(this,arguments)}return Object(g["a"])(n,[{key:"mounted",value:function(){console.log("Reader mounted")}}]),n}(l["c"]);K=Object(s["a"])([l["a"]],K);var W=K,X=W,Y=Object(d["a"])(X,F,G,!1,null,null,null),Z=Y.exports,ee=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},te=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"about"},[n("h1",[e._v("Home sweet Home")]),n("span",[e._v(" Ciao, "),n("br"),e._v(" Questo è un pezzo della nostra isola. ")]),n("span",[e._v(" Ciao, "),n("br"),e._v("M&M. ")])])}],ne=function(e){Object(i["a"])(n,e);var t=Object(u["a"])(n);function n(){return Object(c["a"])(this,n),t.apply(this,arguments)}return n}(l["c"]);ne=Object(s["a"])([l["a"]],ne);var ae=ne,re=ae,oe=Object(d["a"])(re,ee,te,!1,null,null,null),ce=oe.exports;a["a"].use(I["a"]);var ie=[{path:"/About",name:"About",component:O},{path:"/cp",name:"CarouselPosts",component:D},{path:"/",name:"Home",component:ce},{path:"/Reader",name:"Reader",component:Z},{path:"/*",name:"Home",component:ce}],ue=new I["a"]({mode:"history",base:"",routes:ie}),se=ue,le=n("2f62");a["a"].use(le["a"]);var be=new le["a"].Store({state:{},mutations:{},actions:{},modules:{}});a["a"].config.productionTip=!1,new a["a"]({router:se,store:be,render:function(e){return e(q)}}).$mount("#app")},d46a:function(e,t,n){"use strict";var a=n("796a"),r=n.n(a);r.a},f26d:function(e,t,n){"use strict";var a=n("5f83"),r=n.n(a);r.a}});
//# sourceMappingURL=app.184d19fd.js.map