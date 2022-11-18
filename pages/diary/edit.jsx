import Link from 'next/link';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import React, { useState } from 'react';
import moment from 'moment';
import { Button, Stack, TextField } from '@mui/material';
import { Box } from '@mui/system';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { DatePicker } from '@mui/x-date-pickers';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
export default function Diary() {
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
        moment().format('YYYYMMDD')
      ),
      // 第二引数は保存するデータ(ここでは日記の内容)
      { diary: diary }
    );
  };
  console.log(date);

  return (
    <DefaultLayout>
      <Box textAlign="center">
        <h1>
          日記 <NoteAltIcon fontSize="large" />
        </h1>
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

          <p>今日の日記</p>

          <TextField
            type="text"
            name="diary"
            value={diary}
            onChange={(e) => {
              setDiary(e.target.value);
            }}
          />
          <div>
            <Link href="../diary">
              <Button
                variant="contained"
                onClick={() => onClickCreate()}
              >
                保存
              </Button>
            </Link>
          </div>
        </Stack>
      </Box>
    </DefaultLayout>
  );
}
