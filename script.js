///////////////////////////// nav 

const moveNav = function(entries) {
  entries.forEach(entry => {

    if (entry.isIntersecting) {

     nav.classList.remove('fixedNav')
    }
    else {
      nav.classList.add('fixedNav')
    }



   
  })
}
const nav = document.querySelector('.nav')
// const section1 = document.querySelector('#section--1')
const header = document.querySelector('.header')
const navObs = new IntersectionObserver(moveNav, {
  root:null,
  threshold: 0,
 
})
///////////////////////////// Lazy load 

const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = function (entries, observer) {
  const [entry] = entries
  if (!entry.isIntersecting) return
  entry.target.classList.remove('lazy-img')
  entry.target.src = entry.target.dataset.src 
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold:0
})
imgTargets.forEach(img => { 
  console.log('fire');
  imgObserver.observe(img)})




navObs.observe(header)
const section1 = document.querySelector('#section--1')
const navAbout = document.querySelector('#nav__about')
const aboutTop = section1.getBoundingClientRect().top
const offsetPosition = aboutTop +  window.pageYOffset - 40;
navAbout.addEventListener('click', function(){
  console.log(offsetPosition);
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
});
})
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    
  anchor.addEventListener('click', function (e) {
    if (!this.getAttribute('href').startsWith('http')) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
    }
      if (this.getAttribute('href') === '#') return
      // console.log(!this.getAttribute('href').startsWith('http'));
    
     
  });
});
///////////////////////////// reveal section 
const sectionAll = document.querySelectorAll(".section")




const revealSection = function(entries, observer){
    const [entry] = entries
    
    if (entry.isIntersecting){
        entry.target.classList.remove('section--hidden')
        observer.unobserve(entry.target)    
    }
}
const sectionObserver = new IntersectionObserver(revealSection, {
    root:null,
    threshold: .25,
})

sectionAll.forEach(sect => {
    sect.classList.add('section--hidden')
    sectionObserver.observe(sect)
})


///////////////////////////// about slider
const slidesAll = document.querySelectorAll(".slide");

let currentSlide = 0;

const renderSlide = function () {
  slidesAll.forEach((slide) => {
    slide.classList.remove("activeSlide");
  });
  slidesAll[currentSlide].classList.add("activeSlide");
};
const nextSlide = function () {
  if (currentSlide >= 2) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  renderSlide();
};
setInterval(() => {
  nextSlide();
}, 10000);

///////////////////////////// work slider


const workSlider = document.querySelector(".works__slider");
const slide2All = document.querySelectorAll(".slide2");
const arrowRight = document.querySelector(".slider__arrow--right img");
const arrowLeft = document.querySelector(".slider__arrow--left img");

const removeLive = function(){
  const currSlide2 = document.querySelectorAll('.currSlide2')
  currSlide2.forEach(slide => {
    slide.classList.add('slide2')
    slide.classList.remove('currSlide2')
    
  })
  slide2All.forEach(slide => {
   

    slide.classList.remove('see-live')
    overlay.classList.remove('visible')
    seeLiveBtn.classList.remove('visible')
    seeLiveBtn.style.zIndex = 0;
    slide2Container.classList.remove('visible')

  })
}
let workSlide = 0;
const slide2Container = document.querySelector('.slider2-container')
const moreBtns = document.querySelectorAll('.more-buttons div')
const backBtn = document.querySelector('.back-btn')
const seeMoreBtn = document.querySelector('.see-more-btn')
moreBtns.forEach(btn => {
  btn.classList.add('hidden')
})
const showMoreBtns = function(){
  
  if (workSlide > 1) {
    backBtn.classList.remove('hidden')
   }
  if (workSlide === 0) {
    backBtn.classList.add('hidden')
   }

  if (workSlide >= slide2All.length - 2){
    seeMoreBtn.classList.remove('hidden')
  }
  else {
    seeMoreBtn.classList.add('hidden')
  }
  if (slide2Container.classList.contains('visible')) {
    backBtn.classList.add('hidden')
    seeMoreBtn.classList.add('hidden')
  }
}



const slidesTranslate = function(){
  slide2All.forEach((slide, idx) => {
 
    if (!slide.classList.contains('see-live'))
     slide2All[idx].style.transform = `translateX(-${workSlide * 38}rem)`
  })
}

backBtn.addEventListener('click', function(){
  workSlide = 0;
  backBtn.classList.add('hidden')
  slidesTranslate()
})
const maxSlide = function () {
  
  if (workSlide < 0) {
    workSlide = 0;
  }
  if (workSlide > slide2All.length) workSlide = 0;
};
arrowRight.addEventListener("click", function () {
  // workSlider.style.transform = `translateX(-${workSlide * 38}rem)`;
  workSlide++;
  
  
  maxSlide();
  showMoreBtns()
  if ([...slide2All].map(slide => slide.classList[0]).includes('see-live')){
    setTimeout(() => slidesTranslate(), 450 )
  }
  else {
    slidesTranslate()
  }
  
  removeLive()
 
});
arrowLeft.addEventListener("click", function () {
  workSlide--;

  maxSlide();

  removeLive()
  slidesTranslate()
  showMoreBtns()
});


///////////////////////////// See live 
const overlay = document.querySelector('.overlay')
const seeLiveBtn = document.querySelector('.see-live-btn')

const section2 = document.querySelector('#section--2')
const worksTop = section2.getBoundingClientRect().top
slide2All.forEach(slide => {
  slide.addEventListener('click', function(e){
    const target = e.target.parentNode
 
    console.log(target);
    removeLive()
    const dataURL = target.dataset.url
    const dataDescription = target.dataset.description
    const seeLiveDescription = seeLiveBtn.querySelector('p')
    target.classList.add('see-live')
    target.classList.add('currSlide2')
    target.classList.remove('slide2')
    overlay.classList.add('visible')
    seeLiveBtn.classList.add('visible')
    seeLiveDescription.innerText = dataDescription
    seeLiveBtn.querySelector('a').setAttribute('href', dataURL)
    seeLiveBtn.style.zIndex = 4000;
    slide2Container.classList.add('visible')
   section2.scrollIntoView({
    behavior: 'smooth'
});
showMoreBtns()
   
  })
})
window.addEventListener('scroll', function(){
  if (slide2Container.classList.contains('visible')){

    section2.scrollIntoView({

  });
  }
})

const emailBtn = document.querySelector('.email-btn')
const formContainer = document.querySelector('.footer__form-container')


overlay.addEventListener('click', function(){

removeLive()
formContainer.classList.remove('visible')
overlay.classList.remove('visible')
})


emailBtn.addEventListener('click', function(){
formContainer.classList.add('visible')
overlay.classList.add('visible')
})