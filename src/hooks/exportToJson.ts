import { TaskProps } from '../components/Calendar/Calendar';

export const exportToJSON = (tasks: (TaskProps | undefined)[]) => {
  const jsonCalendarData = JSON.stringify(tasks, null, 2);
  const blob = new Blob([jsonCalendarData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'calendar.json';
  link.click();
};
