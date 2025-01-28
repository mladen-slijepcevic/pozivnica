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
        seconds: "Seconds"
    },
    sr: {
        preTitle: "Venčanje",
        inviteText: "Pozivamo vas da proslavite našu ljubav",
        gettingMarried: "Venčavamo se!",
        withJoy: "Sa radošću u srcima,",
        inviteMessage: "Srdačno vas pozivamo da podelite našu sreću",
        asWeJoin: "dok stupamo u brak",
        churchCeremony: "Crkveno venčanje",
        guestGathering: "Okupljanje gostiju",
        weddingCelebration: "Svadbeno veselje",
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
        seconds: "Sekundi"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langSelector = document.querySelector('.language-selector');
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Hide language selector after 3 seconds on initial load
    setTimeout(() => {
        langSelector.classList.add('hidden');
    }, 3000);

    // Show language selector when hovering near the top right corner
    document.addEventListener('mousemove', (e) => {
        if (e.clientY < 100 && e.clientX > window.innerWidth - 100) {
            langSelector.classList.remove('hidden');
        }
    });

    // For mobile: show on tap near top right corner
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        if (touch.clientY < 100 && touch.clientX > window.innerWidth - 100) {
            langSelector.classList.remove('hidden');
        }
    });

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            setLanguage(lang);
            
            // Update active button
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Hide selector after selection
            setTimeout(() => {
                langSelector.classList.add('hidden');
            }, 500);
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
}

// Set initial language based on stored preference or default to Serbian
const savedLang = localStorage.getItem('preferredLanguage') || 'sr';
setLanguage(savedLang);
document.querySelector(`[data-lang="${savedLang}"]`).classList.add('active');

function updateCountdown() {
    const weddingDate = new Date('2025-05-31T14:15:00+02:00').getTime(); // Added timezone offset for Serbia
    const now = new Date().getTime();
    const timeLeft = weddingDate - now;

    // Check if the date has passed
    if (timeLeft < 0) {
        document.getElementById('days').innerHTML = '00';
        document.getElementById('hours').innerHTML = '00';
        document.getElementById('minutes').innerHTML = '00';
        document.getElementById('seconds').innerHTML = '00';
        return;
    }

    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update DOM with padded numbers
    document.getElementById('days').innerHTML = days.toString().padStart(2, '0');
    document.getElementById('hours').innerHTML = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerHTML = seconds.toString().padStart(2, '0');

    // Add animation class only when the number changes
    document.querySelectorAll('.countdown-number').forEach(el => {
        el.classList.add('animate');
        setTimeout(() => el.classList.remove('animate'), 500);
    });
}

// Update countdown every second
setInterval(updateCountdown, 1000);
// Initial call to avoid delay
updateCountdown();
