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
        minutes: "Minutes"
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
        minutes: "Minuta"
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
}

// Set initial language based on stored preference or default to English
const savedLang = localStorage.getItem('preferredLanguage') || 'en';
setLanguage(savedLang);
document.querySelector(`[data-lang="${savedLang}"]`).classList.add('active');
