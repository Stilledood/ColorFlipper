//set date
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();


// close links
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener('click',function(){
    // linksContainer.classList.toggle("show-links");
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    if (containerHeight === 0){
        linksContainer.style.height = `${linksHeight}px`;
    }
    else{
        linksContainer.style.height = 0;
    }
});


//fixed navbar
const navbar = document.getElementById("nav");
const topLInk = document.querySelector(".top-link");
window.addEventListener("scroll",function(){
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) {
        navbar.classList.add('fixed-nav');
    }
    else {
        navbar.classList.remove('fixed-nav');
    }

    if (scrollHeight > 500) {
        topLInk.classList.add("show-link");
    }

    else {
        topLInk.classList.remove("top_link");
    }   
});

// smooth scroll

// select links

const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach(function(link){
    link.addEventListener('click',function(e){
        e.preventDefault();
        // navidate to specific spot
        const id = e.currentTarget.getAttribute('href').slice(1);
        const element =document.getElementById(id);
        let position = element.offsetTop;
        window.scrollTo({
            left:0,
            top:position,
        });
        linksContainer.style.height = 0;

    });
});