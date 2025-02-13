function updateCountdown() {
    // Change this date to your wedding date and time
    const weddingDate = new Date('2025-05-31T14:15:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    // Update using the correct IDs from HTML
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('sati').textContent = String(hours).padStart(2, '0');
    document.getElementById('minuta').textContent = String(minutes).padStart(2, '0');
}

// Update immediately and then every minute
updateCountdown();
setInterval(updateCountdown, 60000); // Update every minute
