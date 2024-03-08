import html2canvas from 'html2canvas';

export const downloadCalendarImage = async (calendarRef: React.RefObject<HTMLDivElement>) => {
  try {
    if (calendarRef.current) {
      const canvas = await html2canvas(calendarRef.current);
      const imageBlob = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageBlob;
      link.download = 'calendar.png';
      link.click();
    }
  } catch (error) {
    console.error('Error capturing calendar as image:', error);
  }
};
