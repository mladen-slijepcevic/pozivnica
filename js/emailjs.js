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
            name: this.name.value,
            email: this.email.value,
            attending: this.attending.value,
            guests: this.guests.value
        };

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
