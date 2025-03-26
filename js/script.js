document.addEventListener("scroll", () => {
    const header = document.getElementById("main-header");
    const headerLabel = document.getElementById("header-label");

    if (window.scrollY > 50) {
        header.classList.add("shrink");
        headerLabel.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
        headerLabel.classList.remove("shrink");
    }
});

const navButton = document.getElementById("nav-button");
const nav = document.querySelector("nav");

navButton.addEventListener("click", () => {
    nav.classList.toggle("open");
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 750) {
        nav.classList.remove("open");
        nav.style.display = ""; // Let the CSS media query control display
    }
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default jump behavior
        
        const targetId = link.getAttribute('href').substring(1); // Get the target section ID
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

