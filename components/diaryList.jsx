import Link from 'next/link';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { auth, db, withIDConverter } from '../firebase';
import {
  doc,
  collection,
  query,
  orderBy,
  where,
  documentId,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import moment from 'moment';
import { Stack } from '@mui/system';
function DiaryList() {
  // ログインした状態にて取得したい
  const [user, loadingUser, errorUser] = useAuthState(auth);
  // useCollectionDataにて複数のドキュメントを取得する
  const [values, loading, error, snapshot] = useCollectionData(
    collection(
      db,
      'user',
      user?.uid ?? 'dummy',
      'diary'
    ).withConverter(withIDConverter)
  );
  console.log(values);
  if (loading) {
    return <>loading...</>;
  }

  return (
    <>
      {values && values?.length > 0 ? (
        // データがある時
        <>
          {values.map((diary, index) => {
            return (
              // 既存のコンポーネント
              <Paper sx={{ padding: 2, margin: 4 }}>
                <div key={index}>
                  <div>{diary.id}</div>
                  <div>{diary.diary}</div>
                </div>
              </Paper>
            );
          })}
        </>
      ) : (
        // データが無いとき
        <>
          <p>一日の振り返りに日記を記入してみましょう。</p>
          <p>
            体調の変化やその日の出来事など書いておくと、あとから振り返ることができますよ。
          </p>
          {values.map((diary, index) => {
            return (
              // 既存のコンポーネント
              <Stack>
                <Paper sx={{ padding: 2 }}>
                  <div key={index}>
                    <div>{diary.id}</div>
                  </div>
                </Paper>
              </Stack>
            );
          })}
        </>
      )}
    </>
  );
}

export default DiaryList;
