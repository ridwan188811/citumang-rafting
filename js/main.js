// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal-elem");
const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const revealOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("reveal");
    observer.unobserve(entry.target);
  });
}, revealOptions);

revealElements.forEach((el) => {
  revealOnScroll.observe(el);
});

// Dark Mode Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

// Check Local Storage for Theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
  if (themeIcon) {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    let theme = "light";

    if (document.body.classList.contains("dark-mode")) {
      theme = "dark";
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    } else {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    }
    localStorage.setItem("theme", theme);
  });
}

// Video Slider Swiper Initialization
if (document.querySelector(".videoSwiper")) {
  const videoSwiper = new Swiper(".videoSwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    initialSlide: 2, // Start in the middle
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    on: {
      slideChange: function () {
        // Pause all videos immediately
        document.querySelectorAll(".videoSwiper video").forEach((v) => {
          v.pause();
          v.currentTime = 0;
        });
        // Play the active video reliably immediately
        const activeSlide =
          this.slides[this.activeIndex].querySelector("video");
        if (activeSlide) {
          activeSlide.play().catch((e) => console.log(e));
        }
      },
      init: function () {
        // Wait slightly for DOM
        setTimeout(() => {
          const activeSlide =
            this.slides[this.activeIndex].querySelector("video");
          if (activeSlide) {
            activeSlide.play().catch((e) => console.log(e));
          }
        }, 100);
      },
    },
  });
}
