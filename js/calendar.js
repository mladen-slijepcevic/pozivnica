document.addEventListener('DOMContentLoaded', function() {
    const event = {
        title: 'Venčanje Jovanke i Mladena',
        description: 'Pozivamo Vas da prisustujete našem venčanju.\n\n' +
                    '14:15 - Crkveno venčanje (Crkva Svetog Kneza Lazara - Lazarica)\n' +
                    '16:00 - Skup svatova (Restoran Verde)\n' +
                    '17:30 - Građansko venčanje (Restoran Verde)',
        location: 'Crkva Svetog Kneza Lazara - Lazarica',
        start: '20250531T141500',
        end: '20250531T235900'  // Assuming the event ends at midnight
    };

    document.getElementById('google-calendar').addEventListener('click', function() {
        const isAndroid = /Android/i.test(navigator.userAgent);
        let url;
        
        if (isAndroid) {
            const startDateUTC = new Date('2025-05-31T14:15:00').toISOString().replace(/[-:.]/g, '').slice(0, -1) + 'Z';
            const endDateUTC = new Date('2025-05-31T23:59:00').toISOString().replace(/[-:.]/g, '').slice(0, -1) + 'Z';
            url = `https://calendar.google.com/calendar/render?action=TEMPLATE`
                + `&text=${encodeURIComponent(event.title)}`
                + `&dates=${startDateUTC}/${endDateUTC}`
                + `&details=${encodeURIComponent(event.description)}`
                + `&location=${encodeURIComponent(event.location)}`;
        } else {
            // Web URL for other platforms
            url = `https://calendar.google.com/calendar/render?action=TEMPLATE`
                + `&text=${encodeURIComponent(event.title)}`
                + `&dates=${event.start}/${event.end}`
                + `&details=${encodeURIComponent(event.description)}`
                + `&location=${encodeURIComponent(event.location)}`
                + `&reminders=ALERT,10080`;
        }
        window.open(url, '_blank');
    });

    document.getElementById('apple-calendar').addEventListener('click', function() {
        // Format description according to iCalendar spec
        const formatICSText = (text) => {
            return text.replace(/\n/g, '\\n')
                      .replace(/[<>]/g, '')
                      .replace(/;/g, '\\;')
                      .replace(/,/g, '\\,');
        };

        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Jovanka i Mladen Wedding//Wedding Invitation//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
            `UID:${Date.now()}@wedding.event`,
            `DTSTART;TZID=Europe/Belgrade:${event.start}`,
            `DTEND;TZID=Europe/Belgrade:${event.end}`,
            `URL:https://mladen-slijepcevic.github.io/pozivnica/`,
            `SUMMARY:${formatICSText(event.title)}`,
            `DESCRIPTION:${formatICSText(event.description)}`,
            `LOCATION:${formatICSText(event.location)}`,
            'BEGIN:VALARM',
            'TRIGGER:-P7D',
            'ACTION:DISPLAY',
            `DESCRIPTION:Reminder: ${formatICSText(event.title)}`,
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.location.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(icsContent);
        } else {
            const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'vencanje-jovanka-mladen.ics');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        }
    });
});
