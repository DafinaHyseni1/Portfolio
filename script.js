// JavaScript to generate moving stars dynamically
const homeSection = document.querySelector("#home");

function generateStar() {
    const star = document.createElement("div");
    star.classList.add("star");

    // Random position within the viewport
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;

    // Random animation speed
    star.style.animationDuration = `${Math.random() * 5 + 5}s`;

    // Append star to the home section
    homeSection.appendChild(star);

    // Remove star after its animation ends
    setTimeout(() => {
        star.remove();
    }, 10000);
}

// Generate stars at intervals
setInterval(generateStar, 100);


// JavaScript for slider
const projectsContainer = document.querySelector('.projects-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let scrollPosition = 0;

nextBtn.addEventListener('click', () => {
  const projectBoxWidth = document.querySelector('.project-box').offsetWidth + 20; // 20 for margin (adjust based on your layout)
  scrollPosition -= projectBoxWidth;
  const maxScrollLeft = -(projectsContainer.scrollWidth - projectsContainer.clientWidth);
  if (scrollPosition < maxScrollLeft) {
    scrollPosition = 0; // Restart from beginning
  }
  projectsContainer.style.transform = `translateX(${scrollPosition}px)`;
});

prevBtn.addEventListener('click', () => {
  const projectBoxWidth = document.querySelector('.project-box').offsetWidth + 20; // 20 for margin (adjust based on your layout)
  scrollPosition += projectBoxWidth;
  if (scrollPosition > 0) {
    scrollPosition = -(projectsContainer.scrollWidth - projectsContainer.clientWidth);
  }
  projectsContainer.style.transform = `translateX(${scrollPosition}px)`;
});



// JavaScript scrollin section About
document.getElementById('explore-btn').addEventListener('click', function() {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
    });
});

// FIGMA Projects Carousel
const figmaProjectsContainer = document.querySelector('#figma-projects .projects-container');
const figmaPrevBtn = document.querySelector('#figma-projects .prev-btn');
const figmaNextBtn = document.querySelector('#figma-projects .next-btn');

let figmaScrollPosition = 0;

figmaNextBtn.addEventListener('click', () => {
  const figmaProjectBoxWidth = document.querySelector('#figma-projects .project-box').offsetWidth + 30; // 30 for margin
  figmaScrollPosition -= figmaProjectBoxWidth;
  const maxScrollLeft = -((figmaProjectsContainer.scrollWidth - figmaProjectsContainer.clientWidth));
  if (figmaScrollPosition < maxScrollLeft) {
    figmaScrollPosition = 0; // Restart from beginning
  }
  figmaProjectsContainer.style.transform = `translateX(${figmaScrollPosition}px)`;
});

figmaPrevBtn.addEventListener('click', () => {
  const figmaProjectBoxWidth = document.querySelector('#figma-projects .project-box').offsetWidth + 30; // 30 for margin
  figmaScrollPosition += figmaProjectBoxWidth;
  if (figmaScrollPosition > 0) {
    figmaScrollPosition = -(figmaProjectsContainer.scrollWidth - figmaProjectsContainer.clientWidth);
  }
  figmaProjectsContainer.style.transform = `translateX(${figmaScrollPosition}px)`;
});



  window.addEventListener("load", () => {
    const sections = document.querySelectorAll("section");

    function generateStarForSection(section) {
        const star = document.createElement("div");
        star.classList.add("star");

        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDuration = `${Math.random() * 5 + 5}s`;

        section.appendChild(star);

        setTimeout(() => {
            star.remove();
        }, 10000);
    }

    setInterval(() => {
        sections.forEach(section => generateStarForSection(section));
    }, 100);
});


 
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(".experience", 
  {
    x: -150,
    opacity: 0,
    borderColor: "transparent"
  },
  {
    x: 0,
    opacity: 1,
    duration: 2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".experience",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  }
);

gsap.fromTo(".interests", 
  {
    x: 150,
    opacity: 0,
    borderColor: "transparent"
  },
  {
    x: 0,
    opacity: 1,
    duration: 2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".interests",
      start: "top 80%",
      toggleActions: "play none none none"
    }
  }
);

