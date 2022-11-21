import React, { useState } from 'react';
import Calendar from 'react-calendar';
import DefaultLayout from '../../components/layout/DefaultLayout';
import 'react-calendar/dist/Calendar.css';
const MyApp = () => {
  const [value, onChange, event] = useState(new Date());
  console.log(value);
  return (
    <>
      <DefaultLayout>
        <div>
          <h1>カレンダー</h1>
          <Calendar
            onChange={onChange}
            value={value}
            // onClick={() => {
            //   event.target.value(value);
            // }}
          />
        </div>
      </DefaultLayout>
    </>
  );
};

export default MyApp;
