document.addEventListener('DOMContentLoaded', function() {
    const event = {
        title: 'Jovanka & Mladen Wedding',
        description: 'Pozivamo Vas da prisustujete na našem venčanju.\n\n' +
                    '14:15 - Crkveno venčanje (Crkva Svetog Kneza Lazara - Lazarica)\n' +
                    '16:00 - Skup svatova (Restoran Verde)\n' +
                    '17:30 - Građansko venčanje (Restoran Verde)',
        location: 'Crkva Svetog Kneza Lazara - Lazarica',
        start: '20250531T141500',
        end: '20250531T235900'  // Assuming the event ends at midnight
    };

    document.getElementById('google-calendar').addEventListener('click', function() {
        // Google Calendar - adding reminder through URL parameters
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}&reminders=ALERT,10080`;  // 10080 minutes = 7 days
        window.open(url, '_blank');
    });

    document.getElementById('apple-calendar').addEventListener('click', function() {
        // Apple Calendar (iCal format) with alarm
        const url = `data:text/calendar;charset=utf-8,BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
URL:http://yourweddingwebsite.com
DTSTART:${event.start}
DTEND:${event.end}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
BEGIN:VALARM
TRIGGER:-P7D
ACTION:DISPLAY
DESCRIPTION:Reminder: ${event.title}
END:VALARM
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
