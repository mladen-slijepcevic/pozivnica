(function() {
    emailjs.init("MHJ6jn54bIHSPQjJt");
    console.log('EmailJS initialized'); // Debug log 1
    
    document.getElementById('rsvp-form').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Form submitted'); // Debug log 2
        
        const form = this;
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Get and log each form value individually
        const name = document.getElementById('name').value;
        console.log('Name captured:', name); // Debug log 3
        
        const email = document.getElementById('email').value;
        console.log('Email captured:', email); // Debug log 4
        
        const attending = document.getElementById('attending').value;
        console.log('Attending captured:', attending); // Debug log 5
        
        const guests = document.getElementById('guests').value;
        console.log('Guests captured:', guests); // Debug log 6

        const templateParams = {
            from_name: name,
            from_email: email,
            attendance: attending,
            guests: guests,
            reply_to: email
        };

        console.log('Template params prepared:', templateParams); // Debug log 7

        // Add loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Šaljem...';

        console.log('About to send email with service_fer518o and template_092gnfq'); // Debug log 8
        
        emailjs.send('service_fer518o', 'template_092gnfq', templateParams)
            .then(function(response) {
                console.log('EmailJS Response:', response); // Debug log 9
                showNotification('success', 'Hvala na odgovoru! 🎉');
                form.reset();
            })
            .catch(function(error) {
                console.error('EmailJS Error Details:', error); // Debug log 10
                showNotification('error', 'Došlo je do greške. Molimo pokušajte ponovo.');
            })
            .finally(function() {
                console.log('Email send attempt completed'); // Debug log 11
                submitButton.disabled = false;
                submitButton.innerHTML = 'Pošalji odgovor';
            });
    });

    function showNotification(type, message) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 3000);
        }, 100);
    }
})();
