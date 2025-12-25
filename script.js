const burger = document.getElementById("burger");
const nav = document.getElementById("nav-menu");
const themeToggle = document.getElementById("theme-toggle");

/* Burger Menu */
burger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

/* Load saved theme */
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
    }
});

/* Toggle theme */
themeToggle.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");

    if (isDark) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});


