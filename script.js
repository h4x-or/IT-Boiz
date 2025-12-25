const burger = document.getElementById("burger");
const nav = document.getElementById("nav-menu");
const toggle = document.getElementById("theme-toggle");

const img = document.getElementById("my-image");
const roundBtn = document.getElementById("round-btn");
const squareBtn = document.getElementById("square-btn");

roundBtn.addEventListener("click", () => {
    img.style.borderRadius = "50%"; // makes it circular
});

squareBtn.addEventListener("click", () => {
    img.style.borderRadius = "0%"; // resets to square
});


/* Burger Menu */
burger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

/* Load saved theme on page load */
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        toggle.checked = true;
    }
});

/* Theme Toggle */
toggle.addEventListener("change", () => {
    if (toggle.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
});
