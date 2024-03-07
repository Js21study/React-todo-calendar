import React, { useRef, useState } from 'react';
import { DayCell } from '../../elements/DayCell/DayCell';
import { CalendarWrapper } from '../../elements/CalendarWrapper';
import { Button } from '../../elements/Button';
import ArrowUp from '../../assets/svg/arrow-up.svg';
import ArrowDown from '../../assets/svg/arrow-down.svg';
import JsonDownload from '../../assets/svg/download-json.svg';
import PictureDownload from '../../assets/svg/download-picture.svg';
import styles from './Calendar.module.css';
import { DayCellStyles } from '../../elements/DayCell/DayCellStyles';
import html2canvas from 'html2canvas';
import { dataTasks } from '../../assets/data/tasks';

export interface TaskProps {
  id: string;
  name: string;
  day: number;
  month: number;
  year: number;
  label: string[];
}

const daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const Calendar: React.FC = () => {
  const calendarRef = useRef<HTMLDivElement>(null);

  const [tasks, setTasks] = useState<(TaskProps | undefined)[]>(dataTasks);
  const [search, setSearch] = useState('');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const prevMonth = (): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  console.log(tasks);

  const nextMonth = (): void => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth();
  const daysInMonth: number = getDaysInMonth(year, month);
  const firstDayOfMonth: number = new Date(year, month, 1).getDay();

  const filterTasks = (label: string) => {
    setTasks(
      [...dataTasks].filter(
        (el) => el?.label[0] === label || el?.label[1] === label || el?.label[2] === label,
      ),
    );
  };

  const searchByTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setTasks([...dataTasks].filter((el) => el?.name.includes(e.target.value)));
  };

  const renderDays = (): JSX.Element[] => {
    const days: JSX.Element[] = [];
    const numberOfDaysToShow = 42;
    for (let i = 0; i < numberOfDaysToShow; i++) {
      const day: Date = new Date(year, month, i - firstDayOfMonth + 1);
      const isCurrentMonth = i >= firstDayOfMonth && i < firstDayOfMonth + daysInMonth;

      days.push(
        <DayCell
          isCurrentMonth={isCurrentMonth}
          tasks={tasks}
          setTasks={setTasks}
          day={day}
          key={i}
        />,
      );
    }
    return days;
  };

  const exportToJSON = () => {
    const jsonCalendarData = JSON.stringify(tasks, null, 2);

    const blob = new Blob([jsonCalendarData], { type: 'application/json' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'calendar.json';
    link.click();
  };

  const downloadCalendarImage = async () => {
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

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <div className={styles.btnGroup}>
          <Button color="lightgray" padding="big" onClick={prevMonth}>
            <img src={ArrowDown} alt="arrow" className={styles.arrow} />
          </Button>
          <Button color="lightgray" padding="big" onClick={nextMonth}>
            <img src={ArrowUp} alt="arrow" className={styles.arrow} />
          </Button>
          <input className={styles.search} type="text" value={search} onChange={searchByTask} />
        </div>

        <h3>
          {currentDate.toLocaleString('en-US', { month: 'long' })} {year}
        </h3>

        <div className={styles.btnGroup}>
          <Button color="red" padding="big" onClick={() => filterTasks('hobby')}>
            Hobby
          </Button>
          <Button color="blue" padding="big" onClick={() => filterTasks('education')}>
            Education
          </Button>
          <Button color="yellowgreen" padding="big" onClick={() => filterTasks('home')}>
            Home
          </Button>
          <Button color="lightgray" padding="big" onClick={() => setTasks(dataTasks)}>
            Month
          </Button>
        </div>
      </div>

      <div className={styles.inner}>
        <div></div>

        <div className={styles.btnGroup}>
          <Button color="darkgray" padding="small" onClick={exportToJSON}>
            <img src={JsonDownload} alt="json" width={40} height={24} />
          </Button>
          <Button color="darkgray" padding="small" onClick={downloadCalendarImage}>
            <img src={PictureDownload} alt="picture" width={40} height={24} />
          </Button>
        </div>
      </div>

      <CalendarWrapper ref={calendarRef}>
        {daysOfWeek.map((day) => (
          <DayCellStyles
            key={day}
            isCurrentMonth={true}
            isDate={false}
            className={styles.dayOfWeek}
          >
            {day}
          </DayCellStyles>
        ))}
        {renderDays()}
      </CalendarWrapper>
    </div>
  );
};

export default Calendar;
