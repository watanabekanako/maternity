import React, { useState, useEffect } from 'react';
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
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { doc, collection, setDoc } from 'firebase/firestore';
import moment from 'moment';
import { Skeleton, Typography } from '@mui/material';
const MyApp = () => {
  const [selectedValue, setSelectedValue] = useState();
  const [user, loadingUser, errorUser] = useAuthState(auth);
  // 更新中の日記の値
  const [diary, setDiary] = useState();
  // 編集中かどうか
  const [editing, setEditing] = useState(false);

  const [values, loading, error, snapshot] = useDocumentData(
    doc(
      db,
      'user',
      user?.uid ?? 'dummy',
      'diary',
      moment(selectedValue).format('YYYYMMDD')
    )
  );

  // ダイアログ開閉
  const handleClose = () => {
    setDiary(undefined);
    setSelectedValue(undefined);
  };
  // console.log(values);
  // console.log(user.uid);
  console.log(moment(selectedValue).format('YYYYMMDD'));
  // useStateになにもわたさないとundefind(=未定義)が初期値になる

  // console.log(value);
  // const handleClose = () => onClose(selectedValue);

  // console.log(`selectedValue; ${selectedValue}`);
  console.log('diary', diary);

  useEffect(() => {
    setDiary(values?.diary);
  }, [values]);
  return (
    <>
      <DefaultLayout>
        <Box textAlign="center">
          <h1>日記カレンダー</h1>
          <div className="diaryCalender">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Calendar
                maxWidth={false}
                sx={{ width: '600' }}
                onClickDay={(value, event) => {
                  setSelectedValue(value);
                }}
              />
            </Box>

            <Dialog onClose={handleClose} open={selectedValue}>
              <DialogTitle>
                日付:{moment(selectedValue)?.format('YYYY/MM/DD')}
              </DialogTitle>
              <DialogContent>
                {loading ? (
                  <Skeleton />
                ) : (
                  <>
                    {editing ? (
                      <TextField
                        value={diary}
                        placeholder={'まだ登録されていません。'}
                        onChange={(e) => {
                          setDiary(e.target.value);
                        }}
                        inputProps={{
                          readOnly: !editing,
                        }}
                      />
                    ) : (
                      <Box>
                        <Typography>{diary}</Typography>
                      </Box>
                    )}
                    <Box
                      value={diary}
                      placeholder={'まだ登録されていません。'}
                      onChange={(e) => {
                        setDiary(e.target.value);
                      }}
                    />
                    {editing ? (
                      <Button
                        sx={{ marginTop: '4' }}
                        onClick={() => {
                          setEditing(false);
                          setDoc(
                            doc(
                              db,
                              'user',
                              user.uid,
                              'diary',
                              moment(selectedValue)?.format(
                                'YYYYMMDD'
                              )
                            ),
                            {
                              diary: diary,
                            },
                            {
                              merge: true,
                            }
                          );
                        }}
                      >
                        更新する
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          setEditing(true);
                        }}
                      >
                        編集する
                      </Button>
                    )}
                  </>
                )}
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>閉じる</Button>
              </DialogActions>
            </Dialog>
          </div>
          <DiaryCalenderModal />
        </Box>
      </DefaultLayout>
    </>
  );
};

export default MyApp;
