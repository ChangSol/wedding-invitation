(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[695],{5378:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/events",function(){return t(8396)}])},8396:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return h}});var c=t(5893),i=t(7294),r=t(3977),s=t(7927),a={apiKey:"AIzaSyBMhcNMzdCAULRiEOWmu0eah53vs6MG9bA",authDomain:"sms1-7b3d1.firebaseapp.com",projectId:"sms1-7b3d1",storageBucket:"sms1-7b3d1.appspot.com",messagingSenderId:"125076609340",appId:"1:125076609340:web:cdff320be27a0bd720a639"},o=t(1664),u=t.n(o),$=(0,r.ZF)(a),l=(0,s.v0)($);l.languageCode="ko";var f=function(){console.log(a);var e=(0,i.useState)(""),n=e[0],t=e[1],r=(0,i.useState)(""),o=r[0],$=r[1],f=(0,i.useState)(180),h=f[0],d=f[1],_=(0,i.useState)(!1),p=_[0],v=_[1];(0,i.useEffect)(function(){if(p){var e=setInterval(function(){h>0?d(h-1):(clearInterval(e),window.location.reload(),alert("인증 오류 발생. ChangSol에게 문의해 주세요."))},1e3);return function(){clearInterval(e)}}},[h,p]);var g=Math.floor(h/60),x=h%60,b=function(){d(180),v(!0)},j=function(){if(""===n){alert("휴대폰번호를 입력해 주세요. ex) 01012344321");return}if(!/^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/.test(n)){alert("휴대폰번호 형식이 맞지 않습니다. ex) 01012344321");return}window.recaptchaVerifier||(window.recaptchaVerifier=new s.lI("sign-in-button",{size:"invisible",callback:function(e){}},l)),window.recaptchaVerifier.render(),(0,s.$g)(l,"+82 "+n.slice(1),window.recaptchaVerifier).then(function(e){window.confirmationResult=e,b()}).catch(function(e){console.log(e),window.location.reload(),alert("인증번호 요청 실패. ChangSol에게 문의해 주세요.")})},m=function(){window.confirmationResult.confirm(o).then(function(e){e.user,alert("인증번호 확인완료")}).catch(function(e){console.log(e),window.location.reload(),alert("인증번호 확인 실패. ChangSol에게 문의해 주세요.")})};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(u(),{href:{pathname:"/events/success",query:{phone:"".concat(n)}},as:"/events/success",children:(0,c.jsx)("button",{children:"인증번호 확인"})}),(0,c.jsx)("div",{id:"sign-in-button"}),(0,c.jsx)("div",{children:p?(0,c.jsxs)("div",{children:[(0,c.jsxs)("p",{children:[g<10?"0":"",g,":",x<10?"0":"",x]}),(0,c.jsx)("input",{type:"text",placeholder:"인증번호 입력",value:o,onChange:function(e){return $(e.target.value)}}),(0,c.jsx)(u(),{href:{pathname:"/events/success",query:{phone:"".concat(n)}},as:"/events/success",children:(0,c.jsx)("button",{onClick:m,children:"인증번호 확인"})})]}):(0,c.jsxs)("div",{children:[(0,c.jsx)("input",{type:"text",placeholder:"휴대폰번호(01012341234)",value:n,onChange:function(e){return t(e.target.value)}}),(0,c.jsx)("button",{onClick:j,children:"인증번호 요청"})]})})]})},h=function(){return(0,c.jsxs)("div",{children:["이벤트 페이지 입니다.",(0,c.jsx)(f,{})]})}}},function(e){e.O(0,[551,664,264,774,888,179],function(){return e(e.s=5378)}),_N_E=e.O()}]);