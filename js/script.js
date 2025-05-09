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

function loadExperiences() {
    fetch('/config/experiences.json')
        .then(res => res.json())
        .then(experiences => {
            const container = document.getElementById('experiences');
            experiences.forEach(exp => {
                const div = document.createElement('div');
                div.id = `exp-${exp.id}`;
                div.className = 'experience';
                div.innerHTML = `
                    <img src="${exp.img}" alt="${exp.alt}" class="experience-img">
                    <div class="label">
                        <div class="title">
                            <h3>${exp.title}</h3>
                            <h4>${exp.date}</h4>
                        </div>
                        <p>${exp.description.join(' ')}</p>
                    </div>
                `;
                container.appendChild(div);
            });
        });
}

function loadProjects() {
    fetch('/config/projects.json')
        .then(res => res.json())
        .then(projects => {
            const container = document.getElementById('projects');
            projects.forEach(prj => {
                const div = document.createElement('div');
                div.id = `prj-${prj.id}`;
                div.className = 'project';
                div.innerHTML = `
                    <div class="label">
                        <div class="title">
                            <h3>${prj.title}</h3>
                            <h4>${prj.date}</h4>
                        </div>
                        <p>${prj.description.join(' ')}</p>
                    </div>
                    <img src="${prj.img}" alt="${prj.alt}" class="project-img">
                `;
                container.appendChild(div);
            });
        });
}

loadExperiences();
loadProjects();
