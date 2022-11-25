import React, { useState } from 'react';
import Calendar from 'react-calendar';
import DefaultLayout from '../../components/layout/DefaultLayout';
import 'react-calendar/dist/Calendar.css';
import DiaryCalenderModal from '../../components/layout/DiaryCalenderModal';
import Modal from '@mui/material/Modal';
const MyApp = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, onChange, event] = useState(new Date());
  // console.log(value);
  //valueでクリックした日付を取ることができる
  const [today, setToday] = useState();

  return (
    <>
      <DefaultLayout>
        <div>
          <h1>カレンダー</h1>
          <Calendar
            onChange={onChange}
            value={today}
            onClickDay={(value, event) => {
              event.target.value;
              // event,target.valueにてクリックした日付を取得
              console.log(event.target.value);
            }}
          />
          <Modal
            open={open}
            // このopenにonClickDay渡す?
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          ></Modal>
        </div>
        <DiaryCalenderModal />
      </DefaultLayout>
    </>
  );
};

// カレンダー
// onClickDayを押したらモーダルが開くようにしたい

export default MyApp;
