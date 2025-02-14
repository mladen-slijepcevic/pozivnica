(function() {
    emailjs.init("MHJ6jn54bIHSPQjJt");
    
    document.getElementById('rsvp-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const form = this;
        const submitButton = form.querySelector('button[type="submit"]');
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const attending = document.getElementById('attending').value;
        const guests = document.getElementById('guests').value;

        const templateParams = {
            from_name: name,
            from_email: email,
            attendance: attending,
            guests: guests,
            reply_to: email
        };

        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Šaljem...';
        
        emailjs.send('service_fer518o', 'template_092gnfq', templateParams)
            .then(function(response) {
                showNotification('success', 'Hvala na odgovoru! 🎉');
                form.reset();
            })
            .catch(function(error) {
                showNotification('error', 'Došlo je do greške. Molimo pokušajte ponovo.');
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
