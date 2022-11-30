import Link from 'next/link';
import DefaultLayout from './layout/DefaultLayout';
import { doc, setDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import React, { useState } from 'react';
import moment from 'moment';
import { Box } from '@mui/system';
import { Button, Stack, TextField } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { DatePicker } from '@mui/x-date-pickers';

export default function WeightEdit({ onClickSave }) {
  const [weight, setWeight] = useState();

  // モーメント型の日付
  const [date, setDate] = useState(moment());
  const [user, loadingUser, errorUser] = useAuthState(auth);

  const onClickCreate = async () => {
    await setDoc(
      // 第一引数が保存先
      doc(
        db,
        'user',
        user?.uid ?? 'dummy',
        'weight',
        date.format('YYYYMMDD')
      ),
      // 第二引数が保存するデータ
      { weight: weight }
    );
    onClickSave();
  };
  // console.log(db);
  // console.log(values);
  console.log(date);
  return (
    // <DefaultLayout>
    <Box textAlign="center">
      {/* <h1>体重管理</h1> */}
      <p>日付と体重を入力してね！</p>
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
          type="number"
          inputProps={{ step: 0.1, min: 0 }}
          label="体重"
          name="weight"
          value={weight}
          onChange={(e) => {
            setWeight(Number(e.target.value));
          }}
        />
        <div>
          <Button variant="contained" onClick={() => onClickCreate()}>
            保存
          </Button>
        </div>
      </Stack>
    </Box>

    // </DefaultLayout>
  );
}
