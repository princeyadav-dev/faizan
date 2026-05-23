/* =========================================================
   FATIMA'S KITCHEN
   MAIN.JS
========================================================= */



/* =========================================================
   MOBILE NAVBAR
========================================================= */

const mobileMenuBtn =
    document.querySelector(".mobile-menu-btn");

const navbar =
    document.querySelector(".navbar");



if (mobileMenuBtn) {

    mobileMenuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");

    });

}



/* =========================================================
   CLOSE NAVBAR ON LINK CLICK
========================================================= */

const navLinks =
    document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar.classList.remove("active");

    });

});



/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header =
    document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.background =
            "rgba(0,0,0,0.95)";

        header.style.padding =
            "15px 5%";

    }

    else {

        header.style.background =
            "rgba(0,0,0,0.5)";

        header.style.padding =
            "20px 5%";

    }

});



/* =========================================================
   HERO SLIDER
========================================================= */

const slides =
    document.querySelectorAll(".hero-slide");

let currentSlide = 0;



function changeSlide() {

    slides.forEach(slide => {

        slide.classList.remove("active-slide");

    });

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    slides[currentSlide]
        .classList.add("active-slide");

}



if (slides.length > 0) {

    slides[0]
        .classList.add("active-slide");

    setInterval(changeSlide, 5000);

}



/* =========================================================
   SCROLL REVEAL ANIMATION
========================================================= */

function revealElements() {

    const reveals =
        document.querySelectorAll(".reveal");

    reveals.forEach(element => {

        const windowHeight =
            window.innerHeight;

        const revealTop =
            element.getBoundingClientRect().top;

        const revealPoint = 120;

        if (revealTop < windowHeight - revealPoint) {

            element.classList.add("active");

        }

    });

}



window.addEventListener(
    "scroll",
    revealElements
);



/* =========================================================
   SMOOTH SCROLL
========================================================= */

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target =
            document.querySelector(
                this.getAttribute("href")
            );

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});



/* =========================================================
   ACTIVE NAV LINK
========================================================= */

const currentLocation =
    location.href;

const menuItem =
    document.querySelectorAll(".nav-links a");

menuItem.forEach(link => {

    if (link.href === currentLocation) {

        link.classList.add("active");

    }

});



/* =========================================================
   IMAGE LAZY LOAD EFFECT
========================================================= */

const images =
    document.querySelectorAll("img");

images.forEach(img => {

    img.setAttribute("loading", "lazy");

});



/* =========================================================
   PAGE LOADER EFFECT
========================================================= */

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});



/* =========================================================
   PARALLAX HERO EFFECT
========================================================= */

window.addEventListener("scroll", () => {

    const hero =
        document.querySelector(".hero");

    if (hero) {

        hero.style.backgroundPositionY =
            window.pageYOffset * 0.5 + "px";

    }

});



/* =========================================================
   CONSOLE BRANDING
========================================================= */

console.log(

    "%cFatima's Kitchen 🍽",
    
    "color: gold; font-size: 20px; font-weight: bold;"

);

console.log(

    "%cLuxury QR Restaurant System Loaded Successfully",

    "color: white; background: black; padding: 8px;"

);



/* =========================================================
   END OF MAIN.JS
========================================================= */