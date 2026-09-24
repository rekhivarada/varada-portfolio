const root=document.documentElement;
const themeToggle=document.getElementById("themeToggle");
const mobileThemeToggle=document.getElementById("mobileThemeToggle");
const menuButton=document.getElementById("menuButton");
const mobileMenu=document.getElementById("mobileMenu");

function setTheme(theme){
  root.setAttribute("data-theme",theme);
  localStorage.setItem("portfolio-theme",theme);
  const icon=theme==="dark"?"☾":"☼";
  if(themeToggle) themeToggle.textContent=icon;
  if(mobileThemeToggle) mobileThemeToggle.textContent=icon;
}
const savedTheme=localStorage.getItem("portfolio-theme");
setTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark":"light"));
[themeToggle,mobileThemeToggle].forEach(btn=>btn&&btn.addEventListener("click",()=>{
  setTheme(root.getAttribute("data-theme")==="dark"?"light":"dark");
}));

menuButton?.addEventListener("click",()=>mobileMenu.classList.toggle("open"));
mobileMenu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mobileMenu.classList.remove("open")));

const progress=document.getElementById("progressBar");
window.addEventListener("scroll",()=>{
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=`${max>0?(window.scrollY/max)*100:0}%`;
},{passive:true});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.querySelectorAll(".filter").forEach(filter=>{
  filter.addEventListener("click",()=>{
    document.querySelectorAll(".filter").forEach(f=>f.classList.remove("active"));
    filter.classList.add("active");
    const value=filter.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card=>{
      card.classList.toggle("hidden",value!=="all" && card.dataset.category!==value);
    });
  });
});

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{
  if(window.innerWidth>900){
    glow.style.left=e.clientX+"px";
    glow.style.top=e.clientY+"px";
  }
},{passive:true});
