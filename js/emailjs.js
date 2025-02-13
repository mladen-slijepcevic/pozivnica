(function() {
    emailjs.init("MHJ6jn54bIHSPQjJt"); // Replace with your EmailJS user ID
    
    document.getElementById('rsvp-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        const templateParams = {
            name: this.name.value,
            email: this.email.value,
            attending: this.attending.value,
            guests: this.guests.value
        };

        emailjs.send('service_fer518o', 'template_092gnfq', templateParams)
            .then(function() {
                alert('RSVP sent successfully!');
                document.getElementById('rsvp-form').reset();
            }, function(error) {
                alert('Failed to send RSVP. Please try again.');
                console.error('EmailJS error:', error);
            })
            .finally(function() {
                submitButton.disabled = false;
                submitButton.textContent = 'Pošalji odgovor';
            });
    });
})();
