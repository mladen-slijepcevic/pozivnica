console.log('Script loaded successfully');

// Cleanup on page unload
window.addEventListener('unload', () => {
    // Clear any existing intervals
    for (let i = 1; i < 100; i++) {
        clearInterval(i);
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
        weddingCelebration: "Građansko venčanje",
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
        attendYes: "Dolazim",
        attendNo: "Nažalost ne mogu"
    }
};

// Event handling utilities
const EventHandlers = {
    // Debounce function for event handlers
    debounce(fn, delay = 300) {
        let timeoutId;
        let lastRun = 0;
        
        return function (...args) {
            const now = Date.now();
            
            if (now - lastRun < delay) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    lastRun = now;
                    fn.apply(this, args);
                }, delay);
                return;
            }
            
            lastRun = now;
            fn.apply(this, args);
        };
    },

    // Safe event listener addition
    addListener(element, eventType, handler, options = {}) {
        if (!element || !eventType || !handler) return;
        
        const wrappedHandler = EventHandlers.debounce((e) => {
            try {
                handler.call(element, e);
            } catch (error) {
                console.error('Event handler error:', error);
            }
        });
        
        element.addEventListener(eventType, wrappedHandler, options);
    },

    // Initialize all event listeners
    initializeEvents() {
        // Language switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            EventHandlers.addListener(btn, 'click', function(e) {
                e.preventDefault();
                if (this.classList.contains('active')) return;
                
                // Update language buttons state
                document.querySelectorAll('.lang-btn').forEach(b => 
                    b.classList.remove('active'));
                this.classList.add('active');
                
                // Set new language
                setLanguage(this.dataset.lang);
            });
        });

        // Map toggles
        document.querySelectorAll('.map-toggle').forEach(btn => {
            EventHandlers.addListener(btn, 'click', function(e) {
                e.preventDefault();
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                const currentLang = localStorage.getItem('preferredLanguage') || 'sr';
                const mapContainer = this.nextElementSibling;
                
                // Update button state
                this.setAttribute('aria-expanded', !isExpanded);
                this.textContent = !isExpanded 
                    ? translations[currentLang].hideMap 
                    : translations[currentLang].showMap;
                
                // Toggle map visibility
                if (mapContainer) {
                    mapContainer.style.display = !isExpanded ? 'block' : 'none';
                    mapContainer.hidden = isExpanded;
                }
            });
        });

        // RSVP form
        const rsvpForm = document.getElementById('rsvp-form');
        if (rsvpForm) {
            EventHandlers.addListener(rsvpForm, 'submit', handleRSVP);
        }

        // Calendar buttons
        document.querySelectorAll('.calendar-btn').forEach(btn => {
            EventHandlers.addListener(btn, 'click', function(e) {
                e.preventDefault();
                const calEvent = generateCalendarEvent();
                if (this.dataset.calendar === 'google') {
                    addToGoogleCalendar(calEvent);
                } else if (this.dataset.calendar === 'ical') {
                    generateICSFile(calEvent);
                }
            });
        });

        // Keyboard navigation
        EventHandlers.addListener(document, 'keydown', function(e) {
            const lightbox = document.getElementById('lightbox');
            if (!lightbox?.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape': closeLightbox(); break;
                case 'ArrowLeft': showPrev(); break;
                case 'ArrowRight': showNext(); break;
            }
        });
    }
};

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing application...');
    
    // Set initial language
    const initialLang = localStorage.getItem('preferredLanguage') || 'sr';
    setLanguage(initialLang);
    
    // Initialize all event handlers
    EventHandlers.initializeEvents();
    
    // Initialize map containers
    document.querySelectorAll('.map-container').forEach(container => {
        container.style.display = 'none';
        container.hidden = true;
    });
    
    console.log('Application initialized successfully');
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
    const timelineEvents = document.querySelectorAll('.timeline-item .event h3, .event h3, .timeline h3');
    console.log('Found timeline events:', timelineEvents.length); // Debug log
    
    timelineEvents.forEach(el => {
        console.log('Current event text:', el.textContent); // Debug log
        const currentText = el.textContent.trim().toLowerCase();
        
        if (currentText.includes('church') || currentText.includes('crkveno')) {
            el.textContent = translations[lang].churchCeremony;
        } else if (currentText.includes('guest') || currentText.includes('skup')) {
            el.textContent = translations[lang].guestGathering;
        } else if (currentText.includes('wedding') || currentText.includes('građansko')) {
            el.textContent = translations[lang].weddingCelebration;
        }
        console.log('Updated to:', el.textContent); // Debug log
    });
    
    // Update countdown labels
    const labels = document.querySelectorAll('.countdown-section .label');
    labels[0].textContent = translations[lang].days;
    labels[1].textContent = translations[lang].hours;
    labels[2].textContent = translations[lang].minutes;
    
    // Update direction buttons
    document.querySelectorAll('a.directions-btn, button.directions-btn').forEach(btn => {
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

    // Update calendar buttons
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
    const currentLang = localStorage.getItem('preferredLanguage') || 'sr';
    
    mapButtons.forEach(button => {
        const newButton = removeExistingListeners(button);
        
        // Set initial text based on current state
        const isExpanded = newButton.getAttribute('aria-expanded') === 'true';
        newButton.textContent = isExpanded 
            ? translations[currentLang].hideMap 
            : translations[currentLang].showMap;
        
        newButton.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            const currentLang = localStorage.getItem('preferredLanguage') || 'sr';
            
            this.setAttribute('aria-expanded', !isExpanded);
            this.textContent = !isExpanded 
                ? translations[currentLang].hideMap 
                : translations[currentLang].showMap;
            
            const mapContainer = this.nextElementSibling;
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
    if (!event || !event.startDate || !event.endDate || !event.title) {
        console.error('Invalid event data provided');
        return;
    }

    try {
        const baseUrl = 'https://calendar.google.com/calendar/render';
        
        // Format dates with timezone consideration
        const startDate = new Date(event.startDate)
            .toISOString()
            .replace(/[-:]/g, '')
            .replace(/\.\d{3}/, '');
        const endDate = new Date(event.endDate)
            .toISOString()
            .replace(/[-:]/g, '')
            .replace(/\.\d{3}/, '');
        const dates = `${startDate}/${endDate}`;
        
        // Add agenda view and other parameters
        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: event.title,
            details: event.description,
            location: event.location,
            dates: dates,
            ctz: Intl.DateTimeFormat().resolvedOptions().timeZone, // Add timezone
            mode: 'AGENDA',  // Set agenda view
            pli: 1,         // Include this event only
            sf: true,       // Show event form
            output: 'xml'   // Better compatibility
        }).toString();

        // Open in new window with proper security attributes
        const calendarWindow = window.open(
            `${baseUrl}?${params}`,
            '_blank',
            'noopener,noreferrer'
        );

        // Fallback if window.open is blocked
        if (calendarWindow === null) {
            const link = document.createElement('a');
            link.href = `${baseUrl}?${params}`;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } catch (error) {
        console.error('Error opening Google Calendar:', error);
        const currentLang = localStorage.getItem('preferredLanguage') || 'sr';
        alert(translations[currentLang].calendarError || 'Error opening calendar');
    }
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

    try {
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'vencanje_jovanka_mladen.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href); // Clean up
    } catch (error) {
        console.error('Error generating ICS file:', error);
    }
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
    const currentLang = localStorage.getItem('preferredLanguage') || 'sr';
    
    // Disable submit button and show loading state
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    
    try {
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            attendance: document.getElementById('attendance').value,
            guests: document.getElementById('guests').value.trim()
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.attendance) {
            throw new Error('Please fill in all required fields');
        }

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'rsvp-message success';
        successMessage.style.cssText = `
            padding: 20px;
            background-color: #e8f5e9;
            color: #2e7d32;
            border-radius: 8px;
            text-align: center;
            font-size: 1.2rem;
            margin-top: 20px;
        `;
        successMessage.textContent = translations[currentLang].rsvpSuccess;
        
        form.innerHTML = '';
        form.appendChild(successMessage);

    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'rsvp-message error';
        errorMessage.style.cssText = `
            padding: 20px;
            background-color: #ffebee;
            color: #c62828;
            border-radius: 8px;
            text-align: center;
            margin-bottom: 20px;
        `;
        errorMessage.textContent = translations[currentLang].rsvpError;
        
        form.prepend(errorMessage);
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
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

// Remove existing listeners helper
function removeExistingListeners(element) {
    const newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);
    return newElement;
}
