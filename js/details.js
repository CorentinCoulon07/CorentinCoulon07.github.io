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

// Get params from URL
const params = new URLSearchParams(window.location.search);
const type = params.get('type'); // "exp" or "prj"
const id = params.get('id');

function getLangFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') === 'fr' ? 'fr' : 'en';
}

let currentLang = getLangFromUrl();

document.getElementById('toggle-lang').addEventListener('click', () => {
    const newLang = currentLang === 'en' ? 'fr' : 'en';
    const params = new URLSearchParams(window.location.search);
    params.set('lang', newLang);
    window.location.search = params.toString();
});

document.getElementById('lang-text').textContent = currentLang === 'en' ? 'Fr' : 'En';

if (type && id) {
    // Choose the correct JSON file
    const jsonUrl = type === 'exp' ? '/config/experiences.json' : '/config/projects.json';
    fetch(jsonUrl)
        .then(res => res.json())
        .then(data => {
            const item = data.find(obj => obj.id === id);
            if (item) {
                // Set the page <title>
                document.title = item[`title-${currentLang}`];
                // Set the page-title h3
                document.getElementById('page-title').textContent = item[`title-${currentLang}`];
            }
            console.log(item); // Log the full object to the console
        })
        .catch(err => console.error('Error loading details:', err));
}