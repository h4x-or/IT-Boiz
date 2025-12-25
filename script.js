const burger = document.getElementById("burger");
const nav = document.getElementById("nav-menu");
const themeToggle = document.getElementById("theme-toggle");

/* Burger Menu */
burger.addEventListener("click", () => {
    nav.classList.toggle("active");
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






