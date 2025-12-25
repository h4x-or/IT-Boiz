const burger = document.getElementById("burger");
const nav = document.getElementById("nav-menu");
const toggle = document.getElementById("theme-toggle");

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
        localStorage.setItem("theme", ":root");
    }
});

