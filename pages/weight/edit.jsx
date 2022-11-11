import Link from 'next/link';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { doc, setDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import React, { useState } from 'react';
import moment from 'moment';
import { Box } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { DatePicker } from '@mui/x-date-pickers';

export default function WeightEdit({}) {
  const [weight, setWeight] = useState();
  const [data, setData] = useState();
  const [user, loadingUser, errorUser] = useAuthState(auth);
  const onClickCreate = async () => {
    await setDoc(
      doc(
        db,
        'user',
        user?.uid ?? 'dummy',
        'weight',
        data.moment('YYYYMMDD')
      ),
      { weight: weight }
    );
  };
  // console.log(db);
  // console.log(values);
  console.log(data);
  return (
    <DefaultLayout>
      <Box textAlign="center">
        <h1>体重管理</h1>
        <p>今日の日付と体重を入力してね！</p>
        <Box>
          <DatePicker
            // error={formErrors.birthDate}
            // helperText={formErrors.birthDate}
            id="outlined-basic"
            label="日付"
            sx={{ width: 600 }}
            variant="outlined"
            margin="dense"
            value={data}
            onChange={(e) => {
              setData(e.target.value);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <TextField
          type="text"
          label="体重"
          name="weight"
          value={weight}
          onChange={(e) => {
            setWeight(Number(e.target.value));
          }}
        />

        <Link href="../weight">
          <Button variant="contained" onClick={() => onClickCreate()}>
            保存
          </Button>
        </Link>
      </Box>
    </DefaultLayout>
  );
}
