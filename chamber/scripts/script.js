const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
});
