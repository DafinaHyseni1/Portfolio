const homeSection = document.querySelector("#home");

function generateStar() {
    const star = document.createElement("div");
    star.classList.add("star");

    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;

    star.style.animationDuration = `${Math.random() * 5 + 5}s`;

    homeSection.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 10000);
}


setInterval(generateStar, 100);


const projectsContainer = document.querySelector('.projects-container');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let scrollPosition = 0;

nextBtn.addEventListener('click', () => {
  const projectBoxWidth = document.querySelector('.project-box').offsetWidth + 20; 
  scrollPosition -= projectBoxWidth;
  const maxScrollLeft = -(projectsContainer.scrollWidth - projectsContainer.clientWidth);
  if (scrollPosition < maxScrollLeft) {
    scrollPosition = 0; 
  }
  projectsContainer.style.transform = `translateX(${scrollPosition}px)`;
});

prevBtn.addEventListener('click', () => {
  const projectBoxWidth = document.querySelector('.project-box').offsetWidth + 20; 
  scrollPosition += projectBoxWidth;
  if (scrollPosition > 0) {
    scrollPosition = -(projectsContainer.scrollWidth - projectsContainer.clientWidth);
  }
  projectsContainer.style.transform = `translateX(${scrollPosition}px)`;
});




document.getElementById('explore-btn').addEventListener('click', function() {
    document.getElementById('about').scrollIntoView({
        behavior: 'smooth'
    });
});

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
  const figmaProjectBoxWidth = document.querySelector('#figma-projects .project-box').offsetWidth + 30; 
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

const cards = document.querySelectorAll(".experience, .interests");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background = `
      radial-gradient(circle at ${x}px ${y}px, 
      rgba(240,165,0,0.15), 
      rgba(255,255,255,0.03))
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.background = "rgba(255,255,255,0.03)";
  });
});

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
    });
});

document.addEventListener("mousemove", (e) => {
    const stars = document.querySelectorAll(".star");
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    stars.forEach((star, index) => {
        const speed = (index % 5) + 1;
        star.style.transform = `translate(${x * speed * 10}px, ${y * speed * 10}px)`;
    });
});

const text = "Welcome to Dafina’s Portfolio";
let i = 0;

function typeEffect() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeEffect, 50);
    }
}

function shootingStar() {
    const star = document.createElement("div");
    star.classList.add("shooting-star");

    star.style.left = Math.random() * window.innerWidth + "px";
    star.style.top = "0px";

    document.body.appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 1000);
}

setInterval(shootingStar, 3000);
window.addEventListener("load", () => {

    const moon = document.querySelector(".moon");
    const content = document.querySelector(".content");
    const subtitle = document.querySelector(".subtitle");
    const button = document.querySelector("#explore-btn");

    
    setTimeout(() => {
        moon.style.top = "28%";
        moon.style.opacity = "1";
    }, 1000);

   
    setTimeout(() => {
        content.style.opacity = "1";
        typeEffect();
    }, 2500);

   
    const typingDuration = text.length * 50; 

    setTimeout(() => {
        subtitle.style.opacity = "1";
    }, 2500 + typingDuration + 200);

    
    setTimeout(() => {
        button.style.opacity = "1";
    }, 2500 + typingDuration + 800);

});

gsap.from(".about-text", {
    x: -100,
    opacity: 0,
    duration: 1.5,
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%"
    }
});

gsap.from(".about-image", {
    x: 100,
    opacity: 0,
    duration: 1.5,
    scrollTrigger: {
        trigger: ".about-section",
        start: "top 80%"
    }
});


(function () {
  emailjs.init("zcwDXXnvY0Gg3Lw2K"); 
})();

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    emailjs.send("service_5u6z3qi", "template_qvyhnku", params)
    .then(function () {
        alert("Message sent successfully, Thank You for your time!");
        document.getElementById("contact-form").reset();
    })
    .catch(function (error) {
        console.log("ERROR:", error);
        alert("Failed to send message");
    });
});
