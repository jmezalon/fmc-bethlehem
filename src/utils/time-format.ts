export const formatTime = (timeString: string, locale: string = 'en') => {
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return date.toLocaleTimeString(
    locale === 'en' ? 'en-US' : locale === 'fr' ? 'fr-FR' : 'en-US',
    {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }
  );
};
