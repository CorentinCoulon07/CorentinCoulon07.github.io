document.addEventListener("scroll", () => {
    const header = document.getElementById("main-header");
    const headerLabel = document.getElementById("header-label");
    const toggleLang = document.getElementById("toggle-lang");

    if (window.scrollY > 50) {
        header.classList.add("shrink");
        headerLabel.classList.add("shrink");
        toggleLang.classList.add("shrink");
    } else {
        header.classList.remove("shrink");
        headerLabel.classList.remove("shrink");
        toggleLang.classList.remove("shrink");
    }
});

const navButton = document.getElementById("nav-button");
const nav = document.querySelector("nav");

// Helper to get URL parameter
function getLangFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') === 'fr' ? 'fr' : 'en';
}

let currentLang = getLangFromUrl();

document.getElementById('toggle-lang').addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'fr' : 'en';
    const params = new URLSearchParams(window.location.search);
    params.set('lang', newLang);
    window.location.search = params.toString(); // This reloads the page
});

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
                            <h3>${exp[`title-${currentLang}`]}</h3>
                            <h4>${exp[`date-${currentLang}`]}</h4>
                        </div>
                        <p>${exp[`description-${currentLang}`].join(' ')}</p>
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
                            <h3>${prj[`title-${currentLang}`]}</h3>
                            <h4>${prj[`date-${currentLang}`]}</h4>
                        </div>
                        <p>${prj[`description-${currentLang}`].join(' ')}</p>
                    </div>
                    <img src="${prj.img}" alt="${prj.alt}" class="project-img">
                `;
                container.appendChild(div);
            });
        });
}

function reloadContent() {
    const scrollY = window.scrollY;
    
    // Clear existing content
    document.getElementById('experiences').innerHTML = '';
    document.getElementById('projects').innerHTML = '';


    loadTranslatableContent()
    loadExperiences();
    loadProjects();

    
    // Restore scroll after a small delay to allow DOM updates
    setTimeout(() => {
        window.scrollTo({ top: scrollY, behavior: 'instant' });
    }, 50);
}

function loadTranslatableContent() {
    fetch('/config/main.json')
        .then(res => res.json())
        .then(translations => {
            const langData = translations[currentLang];

            document.getElementById('nav-abt').textContent = langData['nav-abt'];
            document.getElementById('nav-exp').textContent = langData['nav-exp'];
            document.getElementById('nav-prj').textContent = langData['nav-prj'];
            document.getElementById('nav-cvs').textContent = langData['nav-cvs'];
            document.getElementById('nav-ctc').textContent = langData['nav-ctc'];

            document.getElementById('abt-title').textContent = langData['abt-title'];
            document.getElementById('abt-p').textContent = langData['abt-p'].join(' ');
            document.getElementById('experiences').innerHTML = `<h2>${langData['exp-title']}</h2>`;
            document.getElementById('projects').innerHTML = `<h2>${langData['prj-title']}</h2>`;

            document.getElementById('ctc-title').textContent = langData['ctc-title'];
            document.getElementById('ctc-p').textContent = langData['ctc-p'];

            document.getElementById('cvs-title').textContent = langData['cvs-title'];

            document.getElementById('email').textContent = langData['email'];
            document.getElementById('phone').textContent = langData['phone'];
            // Update the language button text
            document.getElementById('lang-text').textContent = currentLang === 'en' ? 'Fr' : 'En';
        })
        .catch(err => console.error('Error loading translations:', err));
}

// On page load, use currentLang from URL
loadTranslatableContent();
loadExperiences();
loadProjects();
