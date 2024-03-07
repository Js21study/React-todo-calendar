import React, { FC } from 'react';
import { Header } from '../components/Header/Header';
import Calendar from '../components/Calendar/Calendar';

export const Home: FC = () => {
  return (
    <div>
      <Header />
      <Calendar />
    </div>
  );
};
