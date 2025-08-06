const correctPassword = '6111'; // Set your password here

function showPasswordModal() {
    document.getElementById('passwordModal').style.display = "block";
}

function closeModal() {
    document.getElementById('passwordModal').style.display = "none";
}

function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    if (password === correctPassword) {
        showId();
        closeModal();
    } else {
        alert('Incorrect password. Please try again.');
    }
}

function showId() {
    var userIdElement = document.getElementById('userId');
    userIdElement.style.display = "inline";
    userIdElement.previousSibling.style.display = "none"; // hide the placeholder
}

(function () {
  "use strict";
  // Easy selector helper function
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  // Easy event listener function
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  // Easy on scroll event listener
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: "smooth",
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("body").classList.toggle("mobile-nav-active");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Scroll with offset on links with a class name .scrollto
   */
  on("click", ".scrollto", function (e) {
    if (select(this.hash)) {
      e.preventDefault();
      let body = select("body");
      if (body.classList.contains("mobile-nav-active")) {
        body.classList.remove("mobile-nav-active");
        let navbarToggle = select(".mobile-nav-toggle");
        navbarToggle.classList.toggle("bi-list");
        navbarToggle.classList.toggle("bi-x");
      }
      scrollto(this.hash);
    }
  }, true);

  /**
   * Scroll with offset on page load with hash links in the URL
   */
  window.addEventListener("load", () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select(".typed");
  if (typed) {
    let typed_strings = typed.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Skills animation
   */
  let skillsContent = select(".skills-content");
  if (skillsContent) {
    new Waypoint({
      element: skillsContent,
      offset: "80%",
      handler: function () {
        let progress = select(".progress .progress-bar", true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  }

  /**
   * Portfolio isotope and filter
   */
  window.addEventListener("load", () => {
    let portfolioContainer = select(".portfolio-container");
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: ".portfolio-item",
      });

      let portfolioFilters = select("#portfolio-flters li", true);

      on("click", "#portfolio-flters li", function (e) {
        e.preventDefault();
        portfolioFilters.forEach((el) => {
          el.classList.remove("filter-active");
        });
        this.classList.add("filter-active");

        portfolioIsotope.arrange({
          filter: this.getAttribute("data-filter"),
        });
        portfolioIsotope.on("arrangeComplete", function () {
          AOS.refresh();
        });
      }, true);
    }
  });

  /**
   * Initiate portfolio lightbox
   */
  const portfolioLightbox = GLightbox({
    selector: ".portfolio-lightbox",
  });

  /**
   * Portfolio details slider
   */
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();
})();

/**
 * Custom Functions
 */

// Navbar toggle for mobile
function toggleNavbar() {
  const navbar = document.getElementById("navbar");
  navbar.classList.toggle("active");
}

// Update current date and time
function updateDateTime() {
  const currentDateElement = document.getElementById("currentDate");
  const currentTimeElement = document.getElementById("currentTime");

  const now = new Date();

  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const formattedDate = now.toLocaleDateString("en-US", options);
  const formattedTime = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  currentDateElement.textContent = formattedDate;
  currentTimeElement.textContent = formattedTime;
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Theme switcher
const themeSwitchBtn = document.getElementById("theme-switch-btn");
const body = document.body;
themeSwitchBtn.addEventListener("click", () => {
  body.classList.toggle("dark-theme");
});

const apiKey = '07bf5d50456b5181632845cd6b13ad91'; //weather API key

function showError(message) {
    const errorElement = document.getElementById('error-message');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

async function getWeatherByCoords(lat, lon) {
  try {
    // 1. Fetch weather data
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const weatherData = await weatherResponse.json();

    // 2. Fetch location info using Nominatim reverse geocoding
    const locationResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
    const locationData = await locationResponse.json();

    const suburb = locationData.address.suburb || locationData.address.neighbourhood || "";
    const city = locationData.address.city || locationData.address.town || locationData.address.village || weatherData.name;
    //const countryCode = "ZA";  // Manually set to ZA as per your request

    const location = `📍 ${suburb ? suburb + ', ' : ''}${city}, ${weatherData.sys.country}`;
    const temperature = `🌡️ ${Math.round(weatherData.main.temp)}°C`;
    const description = `${weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)}`;
    const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
    const iconAlt = weatherData.weather[0].main;

    document.getElementById('location').innerHTML = `
      ${location}, ${temperature}, ${iconAlt}
      <img src="${iconUrl}" alt="${iconAlt}" style="vertical-align: middle; width: 40px; height: 40px;">
    `;

    document.getElementById('error-message').textContent = "";
  } catch (error) {
    console.error('Error fetching weather or location data:', error);
    showError('Failed to fetch weather/location data. Please try again later.');
  }
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByCoords(lat, lon);
            },
            (error) => {
                console.error('Error getting user location:', error);
                showError('Unable to get your location. Please enable location services and refresh the page.');
            }
        );
    } else {
        showError('Geolocation is not supported by your browser.');
    }
}

getUserLocation();

    // Function to set rating
  let userRating = null;

  function setRating(rating) {
    userRating = rating;
    const stars = document.querySelectorAll(".star");
    stars.forEach((star, index) => {
      if (index < rating) {
        star.style.color = "gold";
      } else {
        star.style.color = "gray";
      }
    });

    // Display emojis based on the rating
    let emoji = '';
    switch (rating) {
      case 1:
        emoji = '😞'; // Frown face
        break;
      case 2:
        emoji = '😟'; // Little sad
        break;
      case 3:
        emoji = '😐'; // Neutral face
        break;
      case 4:
        emoji = '🙂'; // Little smile
        break;
      case 5:
        emoji = '😁'; // Big smile
        break;
      default:
        emoji = ''; // Default, in case something goes wrong
    }

    // Update the selected rating display with stars and the emoji
    document.getElementById("selected-rating").innerHTML = `You rated: ${rating} stars ${emoji}`;
  }

  // Before form submission, check if rating is selected
  document.getElementById("contact-form").addEventListener("submit", function(event) {
    if (userRating === null) {
      event.preventDefault();
      alert("Please provide a rating before submitting the form.");
    } else {
      // Append rating to form submission
      const ratingInput = document.createElement("input");
      ratingInput.type = "hidden";
      ratingInput.name = "rating";
      ratingInput.value = userRating;
      this.appendChild(ratingInput);
    }
  });
        
