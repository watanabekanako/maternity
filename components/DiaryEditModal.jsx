import Link from 'next/link';
import DefaultLayout from './layout/DefaultLayout';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import React, { useState } from 'react';
import moment from 'moment';
import { Button, Stack, TextField, Modal } from '@mui/material';
import { Box } from '@mui/system';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { DatePicker } from '@mui/x-date-pickers';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { modalInnerBoxStyle } from '../definitions/style';
import { BorderColor } from '@mui/icons-material';
export default function DiaryEditModal({
  open,
  onClose,
  description,
}) {
  const [diary, setDiary] = useState();

  const [date, setDate] = useState(moment());
  const [user, loadingUser, errorUser] = useAuthState(auth);
  const onClickCreate = async () => {
    await setDoc(
      // 第一引数は保存先(ここでは日付をIDにしているため)
      doc(
        db,
        'user',
        user?.uid ?? 'dummy',
        'diary',
        date.format('YYYYMMDD')
      ),
      // 第二引数は保存するデータ(ここでは日記の内容)
      { diary: diary }
    );
    onClose();
  };
  console.log(date);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalInnerBoxStyle}>
        <Box textAlign="center">
          <p>{description}</p>
          <Stack spacing={2}>
            <DatePicker
              // error={formErrors.birthDate}
              // helperText={formErrors.birthDate}
              id="outlined-basic"
              label="日付"
              sx={{ width: 600 }}
              variant="outlined"
              margin="dense"
              value={date}
              onChange={(value) => {
                setDate(value);
              }}
              renderInput={(params) => <TextField {...params} />}
            />

            <TextField
              type="text"
              name="diary"
              value={diary}
              onChange={(e) => {
                setDiary(e.target.value);
              }}
            />
            <div>
              <Button
                variant="contained"
                onClick={() => onClickCreate()}
              >
                保存
              </Button>
            </div>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}
