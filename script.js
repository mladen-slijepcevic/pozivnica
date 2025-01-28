console.log('Script loaded successfully');

// Remove all previous event listeners and intervals
window.addEventListener('load', () => {
    // Clear all existing intervals
    for (let i = 1; i < 100; i++) {
        clearInterval(i);
    }
    
    // Remove any existing scripts
    const oldScript = document.getElementById('countdown-script');
    if (oldScript) {
        oldScript.remove();
    }
});

// Language and translation setup
const translations = {
    en: {
        preTitle: "The Wedding of",
        // Remove inviteText: "We invite you to celebrate our love",
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
        saturday: "Saturday, May 31st 2025",
        showMap: "Show Map",
        hideMap: "Hide Map",
        addToGoogleCalendar: "Add to Google Calendar",
        addToIphoneCalendar: "Add to iPhone Calendar",
        countdownTitle: "Time until we celebrate:"
    },
    sr: {
        preTitle: "Venčanje",
        // Remove inviteText: "Vas pozivaju da svojim prisustvom uveličate naše venčanje",
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
        getDirections: "Prikaži lokaciju",
        days: "Dana",
        hours: "Sati",
        minutes: "Minuta",
        seconds: "Sekundi",
        churchVenue: "Crkva svetog Kneza Lazara - Lazarica",
        gatheringVenue: "Restoran Verde",
        weddingVenue: "Restoran Verde",
        saturday: "Subota, 31. Maj 2025",
        showMap: "Prikaži mapu",
        hideMap: "Sakrij mapu",
        addToGoogleCalendar: "Dodaj u Google Kalendar",
        addToIphoneCalendar: "Dodaj u iPhone Kalendar",
        countdownTitle: "Vreme do proslave:"
    }
};

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    // Language button handling
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            setLanguage(lang);
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Initialize countdown
    function updateCountdown() {
        const weddingDate = new Date(2025, 4, 31, 14, 15);
        const now = new Date();
        const diff = weddingDate - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        const elements = {
            days: document.getElementById('countdown-days'),
            hours: document.getElementById('countdown-hours'),
            minutes: document.getElementById('countdown-minutes')
        };

        if (elements.days) elements.days.textContent = days.toString().padStart(2, '0');
        if (elements.hours) elements.hours.textContent = hours.toString().padStart(2, '0');
        if (elements.minutes) elements.minutes.textContent = minutes.toString().padStart(2, '0');
    }

    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 60000);

    // Initialize other features
    handleTimelineAnimation();
    initMapToggles();
    initGallery();
});

function setLanguage(lang) {
    // Store language preference
    localStorage.setItem('preferredLanguage', lang);
    
    // Update all translatable elements
    document.querySelector('.pre-title').textContent = translations[lang].preTitle;
    // Remove this line:
    // document.querySelector('.invitation-intro').textContent = translations[lang].inviteText;
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
    const labels = document.querySelectorAll('.countdown-section .label');
    labels[0].textContent = translations[lang].days;
    labels[1].textContent = translations[lang].hours;
    labels[2].textContent = translations[lang].minutes;
    
    // Update direction buttons
    document.querySelectorAll('.directions-btn').forEach(btn => {
        btn.textContent = translations[lang].getDirections;
    });

    // Update timeline venues
    document.querySelectorAll('.venue').forEach(el => {
        if(el.textContent.includes('Lazarica')) {
            el.textContent = translations[lang].churchVenue;
        }
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

    // Update map toggle buttons
    document.querySelectorAll('.map-toggle').forEach(btn => {
        btn.textContent = btn.getAttribute('aria-expanded') === 'true' 
            ? translations[lang].hideMap 
            : translations[lang].showMap;
    });

    // Update calendar button texts
    document.querySelectorAll('.calendar-btn').forEach(btn => {
        const textSpan = btn.querySelector('.calendar-text');
        if (btn.dataset.calendar === 'google') {
            textSpan.textContent = translations[lang].addToGoogleCalendar;
        } else if (btn.dataset.calendar === 'ical') {
            textSpan.textContent = translations[lang].addToIphoneCalendar;
        }
    });

    // Update invitation text elements
    document.querySelector('.invitation-text p:nth-child(2)').textContent = translations[lang].inviteMessage;
    document.querySelector('.invitation-text p:nth-child(1)').textContent = translations[lang].withJoy;
    document.querySelector('.invitation-text p:nth-child(3)').textContent = translations[lang].asWeJoin;

    // Update countdown title
    document.querySelector('.countdown-section .countdown-title').textContent = translations[lang].countdownTitle;
}

// Set initial language based on stored preference or default to Serbian
const savedLang = localStorage.getItem('preferredLanguage') || 'sr';
setLanguage(savedLang);
document.querySelector(`[data-lang="${savedLang}"]`).classList.add('active');

// The weatherWidget object and its initialization have been removed

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

function initMapToggles() {
    document.querySelectorAll('.map-toggle').forEach(button => {
        button.addEventListener('click', () => {
            const mapContainer = button.nextElementSibling;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            button.setAttribute('aria-expanded', !isExpanded);
            button.textContent = !isExpanded 
                ? translations[localStorage.getItem('preferredLanguage') || 'sr'].hideMap 
                : translations[localStorage.getItem('preferredLanguage') || 'sr'].showMap;
            
            mapContainer.classList.toggle('show');
            mapContainer.hidden = isExpanded;
        });
    });
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
    initMapToggles();
});

function generateCalendarEvent() {
    const event = {
        title: 'Wedding of Jovanka & Mladen',
        description: 'Wedding Ceremony and Celebration\n\n' +
                    '14:15 - Church Ceremony at St. Prince Lazar Church - Lazarica\n' +
                    '16:00 - Guest Gathering at Restoran Verde\n' +
                    '17:00 - Wedding Celebration at Restoran Verde',
        location: 'St. Prince Lazar Church - Lazarica, Belgrade, Serbia',
        startDate: '2025-05-31T14:15:00',
        endDate: '2025-05-31T23:59:00'
    };

    return event;
}

function addToGoogleCalendar(event) {
    const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
    const dates = `${event.startDate}/${event.endDate}`.replace(/[-:]/g, '');
    
    const params = new URLSearchParams({
        text: event.title,
        details: event.description,
        location: event.location,
        dates: dates
    });

    window.open(`${baseUrl}&${params.toString()}`, '_blank');
}

function generateICSFile(event) {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${event.startDate.replace(/[-:]/g, '')}
DTEND:${event.endDate.replace(/[-:]/g, '')}
SUMMARY:${event.title}
DESCRIPTION:${event.description.replace(/\n/g, '\\n')}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'wedding_jovanka_mladen.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

document.addEventListener('DOMContentLoaded', () => {
    // ... existing DOMContentLoaded code ...

    // Add calendar button handlers
    document.querySelectorAll('.calendar-btn').forEach(button => {
        button.addEventListener('click', () => {
            const event = generateCalendarEvent();
            if (button.dataset.calendar === 'google') {
                addToGoogleCalendar(event);
            } else if (button.dataset.calendar === 'ical') {
                generateICSFile(event);
            }
        });
    });
});

async function handleRSVP(event) {
    event.preventDefault();
    
    const form = document.getElementById('rsvp-form');
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        attendance: document.getElementById('attendance').value,
        numberOfGuests: document.getElementById('guests').value || 0,
        timestamp: new Date().toISOString()
    };

    try {
        // Send email using EmailJS
        await emailjs.send(
            "service_fer518o", // Add your EmailJS service ID
            "template_092gnfq", // Add your EmailJS template ID
            {
                to_email: "mladen.slijepcevic.eestec@gmail.com.com", // Your email address
                from_name: formData.name,
                from_email: formData.email,
                attendance: formData.attendance,
                guests: formData.numberOfGuests,
                reply_to: formData.email
            }
        );

        // Store RSVP in localStorage
        let rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');
        rsvps.push(formData);
        localStorage.setItem('rsvps', JSON.stringify(rsvps));

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'rsvp-message success';
        successMessage.textContent = translations[localStorage.getItem('preferredLanguage') || 'sr'].rsvpSuccess;
        
        // Replace form with success message
        form.innerHTML = '';
        form.appendChild(successMessage);

    } catch (error) {
        console.error('RSVP Error:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'rsvp-message error';
        errorMessage.textContent = translations[localStorage.getItem('preferredLanguage') || 'sr'].rsvpError;
        form.prepend(errorMessage);
        submitButton.disabled = false;
    }
}
