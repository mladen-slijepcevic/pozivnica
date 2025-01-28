console.log('Script loaded successfully');

const translations = {
    en: {
        preTitle: "The Wedding of",
        inviteText: "We invite you to celebrate our love",
        gettingMarried: "We're Getting Married!",
        withJoy: "With joy in our hearts,",
        inviteMessage: "We kindly invite you to share in our happiness",
        asWeJoin: "as we join our lives together in marriage",
        churchCeremony: "Church Ceremony",
        guestGathering: "Guest Gathering",
        weddingCelebration: "Wedding Celebration",
        rsvp: "RSVP",
        yourName: "Your Name",
        yourEmail: "Your Email",
        willYouAttend: "Will you attend?",
        joyfullyAccepts: "Joyfully Accepts",
        regretfullyDeclines: "Regretfully Declines",
        numberOfGuests: "Number of Guests",
        sendRsvp: "Send RSVP",
        getDirections: "Get Directions",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        churchVenue: "St. Prince Lazar Church - Lazarica",
        gatheringVenue: "Restaurant Verde",
        weddingVenue: "Restaurant Verde",
        saturday: "Saturday, May 31st 2025"
    },
    sr: {
        preTitle: "Venčanje",
        inviteText: "Vas pozivaju da svojim prisustvom uveličate naše venčanje",
        gettingMarried: "Venčavamo se!",
        withJoy: "Sa radošću u srcima,",
        inviteMessage: "Srdačno vas pozivamo da podelite našu sreću",
        asWeJoin: "dok stupamo u brak",
        churchCeremony: "Crkveno venčanje",
        guestGathering: "Skup svatova",
        weddingCelebration: "Gradjansko venčanje",
        rsvp: "Potvrda dolaska",
        yourName: "Vaše ime",
        yourEmail: "Vaš email",
        willYouAttend: "Da li ćete prisustvovati?",
        joyfullyAccepts: "Radosno prihvatam",
        regretfullyDeclines: "Nažalost ne mogu",
        numberOfGuests: "Broj gostiju",
        sendRsvp: "Pošalji potvrdu",
        getDirections: "Pokaži put",
        days: "Dana",
        hours: "Sati",
        minutes: "Minuta",
        seconds: "Sekundi",
        churchVenue: "Crkva svetog Kneza Lazara - Lazarica",
        gatheringVenue: "Restoran Verde",
        weddingVenue: "Restoran Verde",
        saturday: "Subota, 31. Maj 2025"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            setLanguage(lang);
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
});

function setLanguage(lang) {
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update all translatable elements
    document.querySelector('.pre-title').textContent = translations[lang].preTitle;
    document.querySelector('.invitation-intro').textContent = translations[lang].inviteText;
    document.querySelector('#details h2').textContent = translations[lang].gettingMarried;
    
    // Update RSVP form
    document.querySelector('#name').placeholder = translations[lang].yourName;
    document.querySelector('#email').placeholder = translations[lang].yourEmail;
    
    const attendanceSelect = document.querySelector('#attendance');
    attendanceSelect.options[0].text = translations[lang].willYouAttend;
    attendanceSelect.options[1].text = translations[lang].joyfullyAccepts;
    attendanceSelect.options[2].text = translations[lang].regretfullyDeclines;
    
    document.querySelector('#guests').placeholder = translations[lang].numberOfGuests;
    document.querySelector('#rsvp button').textContent = translations[lang].sendRsvp;
    
    // Update timeline
    document.querySelectorAll('.event h3').forEach(el => {
        if(el.textContent.includes('Church')) el.textContent = translations[lang].churchCeremony;
        if(el.textContent.includes('Guest')) el.textContent = translations[lang].guestGathering;
        if(el.textContent.includes('Wedding')) el.textContent = translations[lang].weddingCelebration;
    });
    
    // Update countdown labels
    document.querySelectorAll('.countdown-item .label').forEach(el => {
        if(el.textContent.includes('Days')) el.textContent = translations[lang].days;
        if(el.textContent.includes('Hours')) el.textContent = translations[lang].hours;
        if(el.textContent.includes('Minutes')) el.textContent = translations[lang].minutes;
    });
    
    // Update direction buttons
    document.querySelectorAll('.directions-btn').forEach(btn => {
        btn.textContent = translations[lang].getDirections;
    });

    // Update timeline venues
    document.querySelectorAll('.venue').forEach(el => {
        if(el.textContent.includes('Lazarica')) el.textContent = translations[lang].churchVenue;
        if(el.textContent.includes('Verde')) {
            // Check if this is in the Wedding Celebration section
            const eventTitle = el.closest('.event').querySelector('h3').textContent;
            if(eventTitle.includes('Wedding')) {
                el.textContent = translations[lang].weddingVenue;
            } else {
                el.textContent = translations[lang].gatheringVenue;
            }
        }
    });

    // Update wedding date in details section
    document.querySelector('.wedding-date').textContent = translations[lang].saturday;
}

// Set initial language based on stored preference or default to Serbian
const savedLang = localStorage.getItem('preferredLanguage') || 'sr';
setLanguage(savedLang);
document.querySelector(`[data-lang="${savedLang}"]`).classList.add('active');

function updateCountdown() {
    const weddingDate = new Date('2025-05-31T14:15:00+02:00').getTime();
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    // Check if the date has passed
    if (timeLeft < 0) {
        document.getElementById('days').innerHTML = '00';
        document.getElementById('hours').innerHTML = '00';
        document.getElementById('minutes').innerHTML = '00';
        return;
    }

    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    // Update DOM with padded numbers
    document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
    document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');

    // Add animation class only when the number changes
    document.querySelectorAll('.countdown-number').forEach(el => {
        el.classList.add('animate');
        setTimeout(() => el.classList.remove('animate'), 500);
    });
}

// Update countdown every minute instead of every second
setInterval(updateCountdown, 60000);
// Initial call to avoid delay
updateCountdown();

const weatherWidget = {
    API_KEY: '905aa3a029084ea481d142351252801',

    async getWeatherForecast() {
        const weatherSection = document.getElementById('weather');
        const weatherEl = document.getElementById('weather-forecast');
        const weddingDate = '2025-05-31';
        const location = 'Belgrade,RS';

        try {
            const response = await fetch(
                `https://api.weatherapi.com/v1/forecast.json?key=${this.API_KEY}&q=${location}&dt=${weddingDate}`
            );
            
            if (!response.ok) {
                throw new Error('Weather API request failed');
            }

            const data = await response.json();
            
            // Get the forecast for the wedding date
            const forecast = data.forecast.forecastday[0].day;
            
            weatherEl.innerHTML = `
                <div class="weather-info">
                    <img src="https:${forecast.condition.icon}" alt="${forecast.condition.text}">
                    <span>${Math.round(forecast.avgtemp_c)}°C</span>
                    <p>${forecast.condition.text}</p>
                    <div class="weather-details">
                        <p>High: ${Math.round(forecast.maxtemp_c)}°C</p>
                        <p>Low: ${Math.round(forecast.mintemp_c)}°C</p>
                        <p>Chance of Rain: ${forecast.daily_chance_of_rain}%</p>
                    </div>
                </div>
            `;
        } catch (err) {
            console.error('Weather forecast error:', err);
            // Hide the entire weather section if there's an error
            weatherSection.style.display = 'none';
        }
    },

    init() {
        this.getWeatherForecast();
        // Update weather every hour
        setInterval(() => this.getWeatherForecast(), 3600000);
    }
};

// Initialize weather widget when the page loads
document.addEventListener('DOMContentLoaded', () => {
    weatherWidget.init();
});

function handleTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', handleTimelineAnimation);

// Gallery Lightbox
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function showImage(index) {
        const images = Array.from(galleryItems);
        currentIndex = index;
        const fullSizeUrl = images[index].dataset.full;
        lightboxImg.src = fullSizeUrl;
        lightboxImg.alt = images[index].alt;
    }

    function openLightbox(index) {
        lightbox.classList.add('active');
        showImage(index);
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxImg.src = '';
        document.body.style.overflow = ''; // Restore scrolling
    }

    function showNext() {
        const images = Array.from(galleryItems);
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function showPrev() {
        const images = Array.from(galleryItems);
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    // Event Listeners
    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                showPrev();
                break;
            case 'ArrowRight':
                showNext();
                break;
            case 'Escape':
                closeLightbox();
                break;
        }
    });
}

// Initialize gallery when the page loads
document.addEventListener('DOMContentLoaded', initGallery);
