(function() {
    emailjs.init("MHJ6jn54bIHSPQjJt");
    
    document.getElementById('rsvp-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const form = this;
        
        // Add loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Šaljem...';

        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            attendance: document.getElementById('attending').value, // Changed from 'attending' to 'attendance'
            guests: document.getElementById('guests').value,
            reply_to: document.getElementById('email').value // Added reply_to parameter
        };

        // Log the values to verify they're being captured
        console.log('Form values:', templateParams);

        emailjs.send('service_fer518o', 'template_092gnfq', templateParams)
            .then(function() {
                showNotification('success', 'Hvala na odgovoru! 🎉');
                form.reset();
            })
            .catch(function(error) {
                showNotification('error', 'Došlo je do greške. Molimo pokušajte ponovo.');
                console.error('EmailJS error:', error);
            })
            .finally(function() {
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
