console.log('Script loaded successfully');

// Add a cleanup function
const cleanup = {
    listeners: new Set(),
    add(element, type, handler) {
        this.listeners.add({ element, type, handler });
        element.addEventListener(type, handler);
    },
    removeAll() {
        this.listeners.forEach(({ element, type, handler }) => {
            element?.removeEventListener(type, handler);
        });
        this.listeners.clear();
    }
};

// Cleanup on page unload
window.addEventListener('unload', () => {
    cleanup.removeAll();
    // Clear intervals
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
        googleCalendar: "Add to Google Calendar",
        icalCalendar: "Add to iPhone Calendar",
        countdownTitle: "Time until we celebrate:",
        rsvpSuccess: "Thank you for your response! We have received your RSVP.",
        rsvpError: "Sorry, there was an error sending your RSVP. Please try again.",
        rsvpDeadline: "Please confirm your attendance by May 1st.",
        attendYes: "Joyfully Accept",
        attendNo: "Regretfully Decline",
        nameRequired: "Please enter your name",
        emailRequired: "Please enter your email address",
        invalidEmail: "Please enter a valid email address",
        attendanceRequired: "Please confirm if you will attend",
        formValidationError: "Please fill in all required fields",
        sending: "Sending..."
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
        googleCalendar: "Dodaj u Google Kalendar",
        icalCalendar: "Dodaj u iPhone Kalendar",
        countdownTitle: "Vreme do proslave:",
        rsvpSuccess: "Hvala na odgovoru! Vaša potvrda je uspešno primljena.",
        rsvpError: "Došlo je do greške. Molimo pokušajte ponovo.",
        rsvpDeadline: "Molim Vas da potvrdite dolazak do 1. maja.",
        attendYes: "Dolazim",
        attendNo: "Nažalost ne mogu",
        nameRequired: "Molimo vas da unesete vaše ime",
        emailRequired: "Molimo vas da unesete vašu email adresu",
        invalidEmail: "Molimo vas da unesete validnu email adresu",
        attendanceRequired: "Molimo vas da potvrdite da li dolazite",
        formValidationError: "Molimo vas da popunite sva obavezna polja",
        sending: "Šalje se..."
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
        
        cleanup.add(element, eventType, wrappedHandler);
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
    if (!translations[lang]) {
        console.error(`Invalid language: ${lang}`);
        lang = 'sr'; // Fallback to Serbian
    }

    // Store language preference
    try {
        localStorage.setItem('preferredLanguage', lang);
    } catch (error) {
        console.error('Failed to store language preference:', error);
    }
    
    const elements = {
        preTitle: '.pre-title',
        gettingMarried: '#details h2',
        nameInput: '#name',
        emailInput: '#email',
        // Add calendar button selectors
        googleCalendar: '[data-calendar="google"]',
        icalCalendar: '[data-calendar="ical"]',
        // Add countdown elements
        countdownTitle: '.countdown-title',
        countdownDays: '#countdown-days + .label',
        countdownHours: '#countdown-hours + .label',
        countdownMinutes: '#countdown-minutes + .label',
        countdownSeconds: '#countdown-seconds + .label'
    };

    // Update elements safely
    Object.entries(elements).forEach(([key, selector]) => {
        const element = document.querySelector(selector);
        if (element) {
            if (element instanceof HTMLInputElement) {
                element.placeholder = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    // Update document language for accessibility
    document.documentElement.lang = lang;
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

    // Add touch support for gallery
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchStartX - touchEndX;
        
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                showNext();
            } else {
                showPrev();
            }
        }
    }, { passive: true });
}

// Initialize gallery when the page loads
document.addEventListener('DOMContentLoaded', initGallery);

function initMapToggles() {
    const mapButtons = document.querySelectorAll('.map-toggle');
    
    mapButtons.forEach(button => {
        const mapContainer = button.nextElementSibling;
        if (!mapContainer?.classList.contains('map-container')) return;
        
        // Load map iframe only when needed
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            
            if (!isExpanded && !mapContainer.querySelector('iframe')) {
                const iframe = document.createElement('iframe');
                iframe.src = mapContainer.dataset.src;
                iframe.loading = 'lazy';
                iframe.title = 'Location map';
                mapContainer.appendChild(iframe);
            }
            
            mapContainer.style.display = isExpanded ? 'none' : 'block';
            mapContainer.hidden = isExpanded;
            button.setAttribute('aria-expanded', !isExpanded);
        }, { passive: true });
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
    const eventDate = '2025-05-31';
    const baseTime = 'T';
    
    try {
        const event = {
            title: 'Venčanje Jovanke i Mladena',
            description: [
                'Venčanje',
                '',
                '14:15 - Crkveno venčanje u Crkvi svetog Kneza Lazara - Lazarica',
                '16:00 - Skup svatova u Restoranu Verde',
                '17:30 - Gradjansko venčanje u Restoranu Verde'
            ].join('\n'),
            location: 'Crkva svetog Kneza Lazara - Lazarica, Beograd, Srbija',
            startDate: `${eventDate}${baseTime}14:15:00`,
            endDate: `${eventDate}${baseTime}23:59:00`
        };

        // Validate dates
        if (!isValidDate(new Date(event.startDate)) || !isValidDate(new Date(event.endDate))) {
            throw new Error('Invalid date format');
        }

        return event;
    } catch (error) {
        console.error('Error generating calendar event:', error);
        return null;
    }
}

function isValidDate(date) {
    return date instanceof Date && !isNaN(date);
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
            name: document.getElementById('name')?.value?.trim(),
            email: document.getElementById('email')?.value?.trim(),
            attendance: document.querySelector('input[name="attendance"]:checked')?.value,
            guests: document.getElementById('guests')?.value?.trim() || '0'
        };

        // Validation
        const errors = [];
        if (!formData.name) {
            errors.push(translations[currentLang].nameRequired || 'Ime je obavezno');
        }
        if (!formData.email) {
            errors.push(translations[currentLang].emailRequired || 'Email je obavezan');
        } else if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errors.push(translations[currentLang].invalidEmail || 'Email nije validan');
        }
        if (!formData.attendance) {
            errors.push(translations[currentLang].attendanceRequired || 'Molimo vas da potvrdite da li dolazite');
        }

        if (errors.length > 0) {
            throw new Error(errors.join('\n'));
        }

        // Here you would typically send the data to your server
        // For now, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request

        // Success handling
        const successMessage = document.createElement('div');
        successMessage.className = 'rsvp-message success';
        successMessage.textContent = translations[currentLang].rsvpSuccess;
        
        // Clear form and show success message
        form.innerHTML = '';
        form.appendChild(successMessage);

        // Optional: Send confirmation email or update UI further
        
    } catch (error) {
        // Error handling
        const errorMessage = document.createElement('div');
        errorMessage.className = 'rsvp-message error';
        errorMessage.textContent = error.message || translations[currentLang].rsvpError;
        
        // Remove any existing error messages
        form.querySelectorAll('.rsvp-message.error').forEach(el => el.remove());
        form.prepend(errorMessage);
        
        // Re-enable submit button
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    }
}

// Add translations for RSVP form
const translations = {
    sr: {
        // ... existing translations ...
        nameRequired: 'Molimo vas da unesete vaše ime',
        emailRequired: 'Molimo vas da unesete vašu email adresu',
        invalidEmail: 'Molimo vas da unesete validnu email adresu',
        attendanceRequired: 'Molimo vas da potvrdite da li dolazite',
        rsvpSuccess: 'Hvala na odgovoru! Vaša potvrda je uspešno primljena.',
        rsvpError: 'Došlo je do greške. Molimo pokušajte ponovo.',
        formValidationError: 'Molimo vas da popunite sva obavezna polja',
        sending: 'Šalje se...'
    },
    en: {
        // ... existing translations ...
        nameRequired: 'Please enter your name',
        emailRequired: 'Please enter your email address',
        invalidEmail: 'Please enter a valid email address',
        attendanceRequired: 'Please confirm if you will attend',
        rsvpSuccess: 'Thank you for your response! We have received your RSVP.',
        rsvpError: 'Sorry, there was an error sending your RSVP. Please try again.',
        formValidationError: 'Please fill in all required fields',
        sending: 'Sending...'
    }
};

// Initialize RSVP form
document.addEventListener('DOMContentLoaded', () => {
    const rsvpForm = document.getElementById('rsvp-form');
    if (rsvpForm) {
        // Add real-time validation
        const inputs = rsvpForm.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
            input.addEventListener('input', () => {
                // Remove error when user starts typing
                const errorEl = input.parentElement.querySelector('.field-error');
                if (errorEl) {
                    errorEl.remove();
                }
            });
        });

        // Handle form submission
        rsvpForm.addEventListener('submit', handleRSVP);
    }
});

// Field validation helper
function validateField(input) {
    const currentLang = localStorage.getItem('preferredLanguage') || 'sr';
    let errorMessage = '';

    if (!input.value.trim()) {
        errorMessage = translations[currentLang][`${input.id}Required`];
    } else if (input.type === 'email' && !input.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        errorMessage = translations[currentLang].invalidEmail;
    }

    // Remove existing error message
    const existingError = input.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }

    // Add new error message if needed
    if (errorMessage) {
        const errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        errorEl.textContent = errorMessage;
        input.parentElement.appendChild(errorEl);
        return false;
    }

    return true;
}

// Update number of guests based on attendance
document.addEventListener('DOMContentLoaded', () => {
    const attendanceInputs = document.querySelectorAll('input[name="attendance"]');
    const guestsInput = document.getElementById('guests');
    const guestsContainer = document.getElementById('guests-container');

    if (attendanceInputs && guestsInput && guestsContainer) {
        attendanceInputs.forEach(input => {
            input.addEventListener('change', () => {
                if (input.value === 'yes') {
                    guestsContainer.style.display = 'block';
                    guestsInput.required = true;
                } else {
                    guestsContainer.style.display = 'none';
                    guestsInput.required = false;
                    guestsInput.value = '0';
                }
            });
        });
    }
});

// Remove existing listeners helper
function removeExistingListeners(element) {
    const newElement = element.cloneNode(true);
    element.parentNode.replaceChild(newElement, element);
    return newElement;
}

// Debounce scroll and resize events
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll performance
const handleScroll = debounce(() => {
    requestAnimationFrame(() => {
        // Your scroll handling code
    });
}, 100);

window.addEventListener('scroll', handleScroll, { passive: true });

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Remove 300ms tap delay on mobile
function removeTapDelay() {
    const touchElements = document.querySelectorAll('button, a, .gallery-item, .map-toggle');
    touchElements.forEach(element => {
        element.style.touchAction = 'manipulation';
    });
}

// Initialize mobile optimizations
document.addEventListener('DOMContentLoaded', () => {
    removeTapDelay();
    lazyLoadImages();
    
    // Add viewport height fix for mobile browsers
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    window.addEventListener('resize', debounce(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 100));
});

function initFormOptimizations() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Prevent zoom on focus in iOS
        input.style.fontSize = '16px';
        
        // Add blur on submit for mobile keyboards
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !input.matches('textarea')) {
                input.blur();
            }
        });
        
        // Clear field button for mobile
        if (input.type === 'text' || input.type === 'email') {
            const clearButton = document.createElement('button');
            clearButton.type = 'button';
            clearButton.className = 'clear-field';
            clearButton.setAttribute('aria-label', 'Clear field');
            clearButton.style.display = 'none';
            
            input.parentNode.insertBefore(clearButton, input.nextSibling);
            
            input.addEventListener('input', () => {
                clearButton.style.display = input.value ? 'block' : 'none';
            });
            
            clearButton.addEventListener('click', () => {
                input.value = '';
                clearButton.style.display = 'none';
                input.focus();
            });
        }
    });
}

function updateCountdown() {
    const weddingDate = new Date('2025-05-31T14:15:00');
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
        // Wedding day has passed
        document.querySelectorAll('.countdown-number').forEach(el => {
            el.textContent = '00';
        });
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update countdown numbers
    document.getElementById('countdown-days').textContent = days.toString().padStart(2, '0');
    document.getElementById('countdown-hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('countdown-minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('countdown-seconds').textContent = seconds.toString().padStart(2, '0');
}

// Initialize countdown
document.addEventListener('DOMContentLoaded', () => {
    updateCountdown(); // Initial update
    setInterval(updateCountdown, 1000); // Update every second
});
