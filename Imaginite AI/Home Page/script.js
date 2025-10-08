// Generate floating stars
function createStars() {
  const starsContainer = document.getElementById('stars');
  const numberOfStars = 40; // Reduced number of stars

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 2) + 's';
    starsContainer.appendChild(star);
  }
}

// Scroll animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.scroll-animate');

  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight * 0.85) { // Trigger earlier
      element.classList.add('animate');
    }
  });
}

//Initialize
document.addEventListener('DOMContentLoaded', function () {
  createStars();
  handleScrollAnimations();

  // Add scroll event listener
  window.addEventListener('scroll', handleScrollAnimations);

  // Testimonial slideshow
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  let currentSlide = 0;

  function showTestimonialSlide(n) {
    testimonialSlides.forEach((slide, index) => {
      if (index === n) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });
  }

  function nextTestimonialSlide() {
    currentSlide = (currentSlide + 1) % testimonialSlides.length;
    showTestimonialSlide(currentSlide);
  }

  function startTestimonialSlideshow() {
    showTestimonialSlide(currentSlide);
    setInterval(nextTestimonialSlide, 5000); // Change slide every 5 seconds
  }

  if (testimonialSlides.length > 0) {
    startTestimonialSlideshow();
  }

  // Feature card interactivity
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // 🌙 Dark/Light Mode Toggle
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    let darkMode = localStorage.getItem("darkMode") === "true";
    applyTheme(darkMode);

    toggleBtn.addEventListener("click", () => {
      darkMode = !darkMode;
      localStorage.setItem("darkMode", darkMode);
      applyTheme(darkMode);
    });

    function applyTheme(dark) {
      if (dark) {
        document.documentElement.style.setProperty("--bg", "#121212");
        document.documentElement.style.setProperty("--text", "#e0e0e0");
        document.documentElement.style.setProperty("--button-bg", "#eee");
        document.documentElement.style.setProperty("--button-text", "#121212");
        toggleBtn.textContent = "☀️";
      } else {
        document.documentElement.style.setProperty("--bg", "#ffffff");
        document.documentElement.style.setProperty("--text", "#111111");
        document.documentElement.style.setProperty("--button-bg", "#222");
        document.documentElement.style.setProperty("--button-text", "#ffffff");
        toggleBtn.textContent = "🌙";
      }
    }
  }
});

function redirectToCreatePage(event) {
  event.preventDefault();
  const url = 'Signup_Page.html'; // Replace with your file name
  window.location.href = url;
}
