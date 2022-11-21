import React, { useState } from 'react';
import Calendar from 'react-calendar';
import DefaultLayout from '../../components/layout/DefaultLayout';
import 'react-calendar/dist/Calendar.css';
import DiaryCalenderModal from '../../components/layout/DiaryCalenderModal';
const MyApp = () => {
  const [open, setOpen] = React.useState(false);
  // モーダル
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
        <DiaryCalenderModal />
      </DefaultLayout>
    </>
  );
};

export default MyApp;
