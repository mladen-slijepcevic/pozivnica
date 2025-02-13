document.addEventListener('DOMContentLoaded', function() {
    const event = {
        title: 'Sarah & John\'s Wedding',
        description: 'Join us for our wedding celebration!',
        location: 'St. Mary\'s Church',
        start: '20240815T140000',
        end: '20240815T220000'
    };

    document.getElementById('google-calendar').addEventListener('click', function() {
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;
        window.open(url, '_blank');
    });

    document.getElementById('apple-calendar').addEventListener('click', function() {
        const url = `data:text/calendar;charset=utf-8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:http://yourweddingwebsite.com
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

        const link = document.createElement('a');
        link.href = encodeURI(url);
        link.setAttribute('download', 'wedding-calendar.ics');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
});