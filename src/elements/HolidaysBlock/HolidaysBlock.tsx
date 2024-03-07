import { FC, useEffect, useState } from 'react';
import styles from './HolidaysBlock.module.css';

interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties: null | string[];
  launchYear: null | number;
  types: string[];
}

interface HolidaysBlockProps {
  date: string;
}

const HolidaysBlock: FC<HolidaysBlockProps> = ({ date }) => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch('https://date.nager.at/api/v3/PublicHolidays/2024/UA');
        if (response.ok) {
          const data = await response.json();
          setHolidays(data);
        } else {
          console.error('Error fetching holidays:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidays();
  }, []);

  return (
    <>
      {holidays.map((holiday) =>
        holiday.date === date ? (
          <span className={styles.text}>{holiday.name}</span>
        ) : (
          holiday.date === date
        ),
      )}
    </>
  );
};

export default HolidaysBlock;
