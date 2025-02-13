import { useCallback } from 'react';

const translations = {
  sr: {
    preTitle: 'Sa radošću vas pozivamo na naše venčanje',
    countdownTitle: 'Do proslave je ostalo:',
    days: 'Dana',
    hours: 'Sati',
    minutes: 'Minuta',
    seconds: 'Sekundi',
    showMap: 'Prikaži mapu',
    hideMap: 'Sakrij mapu',
    saveTheDate: 'Sačuvaj datum',
    addToGoogle: 'Dodaj u Google Calendar',
    addToApple: 'Dodaj u iPhone Calendar',
    rsvpTitle: 'Molimo vas da potvrdite vaše prisustvo',
    nameLabel: 'Ime i prezime',
    emailLabel: 'Email adresa',
    attendingLabel: 'Da li dolazite?',
    guestsLabel: 'Broj gostiju',
    submit: 'Pošalji',
    yes: 'Da',
    no: 'Ne'
  },
  en: {
    preTitle: 'We joyfully invite you to our wedding celebration',
    countdownTitle: 'Time until we celebrate:',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    showMap: 'Show Map',
    hideMap: 'Hide Map',
    saveTheDate: 'Save the Date',
    addToGoogle: 'Add to Google Calendar',
    addToApple: 'Add to iPhone Calendar',
    rsvpTitle: 'Please RSVP',
    nameLabel: 'Full Name',
    emailLabel: 'Email Address',
    attendingLabel: 'Will you attend?',
    guestsLabel: 'Number of guests',
    submit: 'Submit',
    yes: 'Yes',
    no: 'No'
  }
};

export function useTranslation() {
  const locale = typeof window !== 'undefined' 
    ? localStorage.getItem('locale') || 'sr' 
    : 'sr';

  const t = useCallback((key: string) => {
    return translations[locale as keyof typeof translations][key as keyof typeof translations['sr']] || key;
  }, [locale]);

  const setLocale = useCallback((newLocale: 'sr' | 'en') => {
    localStorage.setItem('locale', newLocale);
    window.location.reload();
  }, []);

  return { t, locale, setLocale };
}
