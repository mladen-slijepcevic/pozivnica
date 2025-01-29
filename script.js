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
        pageTitle: "Our Wedding Invitation",
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
        countdownTitle: "Time until we celebrate:",
        rsvpSuccess: "Thank you for your response! We have received your RSVP.",
        rsvpError: "Sorry, there was an error sending your RSVP. Please try again.",
        rsvpDeadline: "Please confirm your attendance by May 1st.",
        attendYes: "Joyfully Accept",
        attendNo: "Regretfully Decline"
    },
    sr: {
        pageTitle: "Pozivnica za svadbu",
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
        sendRsvp: "Pošalji odgovor",
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
        countdownTitle: "Vreme do proslave:",
        rsvpSuccess: "Hvala na odgovoru! Vaša potvrda je uspešno primljena.",
        rsvpError: "Došlo je do greške. Molimo pokušajte ponovo.",
        rsvpDeadline: "Molim Vas da potvrdite dolazak do 1. maja.",
        attendYes: "Radosno prihvatam",
        attendNo: "Nažalost ne mogu"
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
    document.querySelector('#details h2').textContent = translations[lang].gettingMarried;
    
    // Update RSVP form
    document.querySelector('#name').placeholder = translations[lang].yourName;
    document.querySelector('#email').placeholder = translations[lang].yourEmail;
    
    const attendanceSelect = document.querySelector('#attendance');
    attendanceSelect.options[0].text = translations[lang].willYouAttend;
    attendanceSelect.options[1].text = translations[lang].joyfullyAccepts;
    attendanceSelect.options[2].text = translations[lang].regretfullyDeclines;
    
    document.querySelector('#guests').placeholder = translations[lang].numberOfGuests;
    document.querySelector('#rsvp h2').textContent = translations[lang].rsvp;
    document.querySelector('#rsvp button').textContent = translations[lang].sendRsvp;
    document.querySelector('#rsvp .deadline-text').textContent = translations[lang].rsvpDeadline;
    
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

    // Update calendar buttons - with null check
    document.querySelectorAll('.calendar-btn').forEach(btn => {
        if (btn.dataset.calendar === 'google') {
            btn.textContent = translations[lang].addToGoogleCalendar;
        } else if (btn.dataset.calendar === 'ical') {
            btn.textContent = translations[lang].addToIphoneCalendar;
        }
    });

    // Update invitation text elements
    document.querySelector('.invitation-text p:nth-child(2)').textContent = translations[lang].inviteMessage;
    document.querySelector('.invitation-text p:nth-child(1)').textContent = translations[lang].withJoy;
    document.querySelector('.invitation-text p:nth-child(3)').textContent = translations[lang].asWeJoin;

    // Update countdown title
    document.querySelector('.countdown-section .countdown-title').textContent = translations[lang].countdownTitle;

    // Update attendance cards
    document.querySelector('label[for="attend-yes"] .attendance-text').textContent = 
        translations[lang].attendYes;
    document.querySelector('label[for="attend-no"] .attendance-text').textContent = 
        translations[lang].attendNo;

    // Reinitialize map toggles after language change
    initMapToggles();
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
    const mapButtons = document.querySelectorAll('.map-toggle');
    
    mapButtons.forEach(button => {
        // Remove any existing listeners to prevent duplicates
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function() {
            console.log('Map toggle clicked'); // Debug log
            
            const mapContainer = this.nextElementSibling;
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const currentLang = localStorage.getItem('preferredLanguage') || 'sr';
            
            // Toggle aria-expanded
            this.setAttribute('aria-expanded', String(!isExpanded));
            
            // Update button text
            this.textContent = !isExpanded 
                ? translations[currentLang].hideMap 
                : translations[currentLang].showMap;
            
            // Toggle map container
            mapContainer.classList.toggle('show');
            mapContainer.style.display = !isExpanded ? 'block' : 'none';
            mapContainer.hidden = isExpanded;
        });
    });
}

// Ensure the function runs after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing map toggles'); // Debug log
    initMapToggles();
    
    // Initialize map containers to be hidden
    document.querySelectorAll('.map-container').forEach(container => {
        container.style.display = 'none';
        container.hidden = true;
    });
});

function generateCalendarEvent() {
    const event = {
        title: 'Venčanje Jovanke i Mladena',
        description: 'Venčanje\n\n' +
                    '14:15 - Crkveno venčanje u Crkvi svetog Kneza Lazara - Lazarica\n' +
                    '16:00 - Skup svatova u Restoranu Verde\n' +
                    '17:30 - Gradjansko venčanje u Restoranu Verde',
        location: 'Crkva svetog Kneza Lazara - Lazarica, Beograd, Srbija',
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
        dates: dates,
        reminders: 'POPUP,10080' // 7 days in minutes (7 * 24 * 60 = 10080)
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
BEGIN:VALARM
ACTION:DISPLAY
DESCRIPTION:Reminder
TRIGGER:-P7D
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'vencanje_jovanka_mladen.ics';
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
    console.log('RSVP form submitted'); // Debug log
    
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
    
    console.log('Form data:', formData); // Debug log

    try {
        console.log('Attempting to send email...'); // Debug log
        await emailjs.send(
            "service_fer518o",
            "template_092gnfq",
            {
                to_email: "mladen.slijepcevic.eestec@gmail.com",
                from_name: formData.name,
                from_email: formData.email,
                attendance: formData.attendance,
                guests: formData.numberOfGuests,
                reply_to: formData.email
            }
        );
        console.log('Email sent successfully'); // Debug log

        // Create success message with proper styling
        const successMessage = document.createElement('div');
        successMessage.className = 'rsvp-message success';
        successMessage.style.padding = '20px';
        successMessage.style.backgroundColor = '#e8f5e9';
        successMessage.style.color = '#2e7d32';
        successMessage.style.borderRadius = '8px';
        successMessage.style.textAlign = 'center';
        successMessage.style.fontSize = '1.2rem';
        successMessage.textContent = translations[localStorage.getItem('preferredLanguage') || 'sr'].rsvpSuccess;
        
        // Replace form with success message
        form.innerHTML = '';
        form.appendChild(successMessage);

    } catch (error) {
        console.error('RSVP Error:', error); // Debug log
        const errorMessage = document.createElement('div');
        errorMessage.className = 'rsvp-message error';
        errorMessage.style.padding = '20px';
        errorMessage.style.backgroundColor = '#ffebee';
        errorMessage.style.color = '#c62828';
        errorMessage.style.borderRadius = '8px';
        errorMessage.style.textAlign = 'center';
        errorMessage.style.marginBottom = '20px';
        errorMessage.textContent = translations[localStorage.getItem('preferredLanguage') || 'sr'].rsvpError;
        form.prepend(errorMessage);
        submitButton.disabled = false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // Debug log
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        console.log('RSVP form found, adding listener'); // Debug log
        rsvpForm.addEventListener('submit', handleRSVP);
    } else {
        console.log('RSVP form not found!'); // Debug log
    }
});
