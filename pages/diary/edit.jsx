import Link from 'next/link';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import React, { useState } from 'react';
import moment from 'moment';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
export default function Diary() {
  const [diary, setDiary] = useState();

  const onClickCreate = async () => {
    await setDoc(
      doc(db, 'user', '1', 'diary', moment().format('YYYYMMDD')),
      { diary: diary }
    );
  };
  console.log(db);
  // console.log(values);

  console.log(diary);
  return (
    <DefaultLayout>
      <Box textAlign="center">
        <h1>日記</h1>

        <p>日付</p>

        <TextField type="text" name="data" />

        <p>今日の日記</p>

        <TextField
          type="text"
          name="diary"
          value={diary}
          onChange={(e) => {
            s;
          }}
        />
        <div>
          <Link href="../diary">
            <button onClick={() => onClickCreate()}>保存</button>
          </Link>
        </div>
      </Box>
    </DefaultLayout>
  );
}
