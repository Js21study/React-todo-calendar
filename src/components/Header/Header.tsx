import { FC } from 'react';
import styles from './Header.module.css';
import Calendar from '../../assets/svg/calendar.svg';

export const Header: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>React Calendar</div>
      <div className={styles.btn}>
        <span className={styles.icon}>
          <img src={Calendar} alt="calendar" />
        </span>
        Calendar
      </div>
    </div>
  );
};
