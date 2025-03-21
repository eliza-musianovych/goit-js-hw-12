import{a as q,S as L,i as l}from"./assets/vendor-BjRz3xa9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const k="49372169-96077d899f4beec9c9139b15f",w="https://pixabay.com/api/";document.querySelector("input");async function d(o,t){const s=new URLSearchParams({key:k,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15});return(await q.get(`${w}?${s}`)).data}const y=document.querySelector(".gallery"),C=new L(".gallery a",{captions:!0,captionSelector:"img",captionType:"attr",captionsData:"alt",captionDelay:250});function g(o){y.innerHTML="";const t=o.hits.map(({webformatURL:s,largeImageURL:i,tags:e,likes:r,views:n,comments:b,downloads:S})=>`<li class="gallery-item">
    <a class="gallery-link" href="${s}">
    <img
    class="gallery-image"
    src="${i}"
    alt= "${e.split(", ").slice(0,3).join(", ")}"
    width="360px"
    height="200px"
    />
    </a>
    <ul class="image-titles">
    <li>Likes<br>${r}</br></li>
    <li>Views<br>${n}</br></li>
    <li>Comments<br>${b}</br></li>
    <li>Downloads<br>${S}</br></li>
    </ul>
    </li>`).join("");y.insertAdjacentHTML("beforeend",t),C.refresh()}const M=document.querySelector("form"),O=document.querySelector("input"),u=document.querySelector(".button-more"),p=document.querySelector(".loader"),m=document.querySelector(".more");let a=1,c="";const h=()=>u.style.display="block",f=()=>u.style.display="none";M.addEventListener("submit",P);async function P(o){if(o.preventDefault(),document.querySelector(".gallery").innerHTML="",c=O.value.trim(),!c){l.error({message:"Please enter a search query before submitting!",position:"topRight"});return}p.style.display="block",f();try{const t=await d(c,a);if(t.hits.length===0){l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",closeOnClick:!0,color:"#fafafb",messageColor:"#fafafb",backgroundColor:"#ef4040"}),f();return}g(t),a+=1,a>1&&h()}catch{l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",closeOnClick:!0,color:"#fafafb",messageColor:"#fafafb",backgroundColor:"#ef4040"})}finally{p.style.display="none"}}u.addEventListener("click",$);async function $(){f(),m.style.display="block";try{const o=await d(c,a);g(o),a+=1,a>1&&(u.style.display="block")}catch{l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",closeOnClick:!0,color:"#fafafb",messageColor:"#fafafb",backgroundColor:"#ef4040"})}finally{m.style.display="none",h()}}
//# sourceMappingURL=index.js.map
