// counter animation

const counters=document.querySelectorAll(".counter");

let started=false;

window.addEventListener("scroll",()=>{

const stats=document.querySelector(".stats");

if(!stats) return;

const top=stats.getBoundingClientRect().top;

if(top<window.innerHeight && !started){

started=true;

counters.forEach(counter=>{

let target=+counter.dataset.target;

let count=0;

let update=()=>{

count++;

counter.innerText=count;

if(count<target){
requestAnimationFrame(update);
}

};

update();

});

}

});


// testimonial slider

let testimonials=document.querySelectorAll(".testimonial");

let i=0;

setInterval(()=>{

testimonials[i].classList.remove("active");

i=(i+1)%testimonials.length;

testimonials[i].classList.add("active");

},3000);