import React, { useState } from 'react';
import Calendar from 'react-calendar';
import DefaultLayout from '../../components/layout/DefaultLayout';
import 'react-calendar/dist/Calendar.css';
import DiaryCalenderModal from '../../components/layout/DiaryCalenderModal';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/system';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const MyApp = () => {
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // useStateになにもわたさないとundefind(=未定義)が初期値になる
  const [selectedValue, setSelectedValue] = useState();

  // console.log(value);
  // const handleClose = () => onClose(selectedValue);
  console.log(selectedValue);

  // ダイアログ開閉
  const handleClose = () => {
    setSelectedValue(undefined);
  };
  return (
    <>
      <DefaultLayout>
        <div>
          <h1>カレンダー</h1>
          <Calendar
            // onChange={onChange}
            value={selectedValue}
            onClickDay={(value, event) => {
              setSelectedValue(value);
            }}
          />
          {/* <Modal
            open={selectedDate}
            // このopenにonClickDay渡す?
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box></Box>
          </Modal> */}

          <Dialog onClose={handleClose} open={selectedValue}>
            <DialogTitle>日付</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="text"
                type="text"
                fullWidth
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>編集</Button>
              <Button onClick={handleClose}>保存</Button>
            </DialogActions>
          </Dialog>
        </div>
        <DiaryCalenderModal />
      </DefaultLayout>
    </>
  );
};

export default MyApp;
