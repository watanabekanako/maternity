import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import moment from 'moment';
import useSWR from 'swr';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@mui/material/Button';
import DefaultLayout from '../components/layout/DefaultLayout';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { auth, db, withIDConverter } from '../firebase';
import Paper from '@mui/material/Paper';
import {
  doc,
  collection,
  query,
  orderBy,
  where,
  documentId,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box } from '@mui/system';

import { Grid, Stack, Typography } from '@mui/material';
import { Boy } from '@mui/icons-material';
import { format } from 'path';
// const fetcher = (url) => fetch(url).then((res) => res.json());

const Baby = () => {
  const [user, loadingUser, errorUser] = useAuthState(auth);

  const [values, loading, error, snapshot] = useDocumentData(
    // dbの中のquestionsコレクションの中のIDがidのドキュメントを取得
    // 第3引数は必須だがidはすぐに設定されるわけではないので、ダミーの文字列を設定しておく
    doc(db, 'user', user?.uid ?? 'dummy')
  );

  // console.log(values[0].query);
  // if (loading) {
  //   return <>loading...</>;
  // }
  // console.log(moment.unix(values.birthDate.seconds));
  // console.log(data);
  // const moment = require('moment');
  const m1 = moment.unix(values?.birthDate.seconds);

  const m2 = moment();

  const diffDays = m1.diff(m2, 'days');
  const diffWeeks = m1.diff(m2, 'weeks');
  const diffMonths = m1.diff(m2, 'month');

  const [
    valuesMessage,
    loadingMessage,
    errorMessage,
    snapshotMessage,
  ] = useDocumentData(
    doc(db, 'message', String(diffMonths)).withConverter(
      withIDConverter
    )
  );
  console.log(valuesMessage);
  // console.log(diffMonths);
  // console.log(loading);
  // どちらかがtrueだったらloadingを返す
  if (loading || loadingMessage) {
    return <>loading...</>;
  }

  return (
    <React.Fragment>
      <DefaultLayout style={{ border: 2 }}>
        <Box textAlign="center" margin={4} marginBottom={20}>
          <h1>today：{moment().format('YYYY/MM/DD')}</h1>

          <Box>
            <Image src="/img/baby.png" width={500} height={500} />
          </Box>
          <div>
            <Typography variant="h4" sx={{ color: '#705040' }}>
              出産予定日まで
            </Typography>
            あと
            <Typography
              className="countDays"
              variant="h2"
              sx={{ color: '#E4AF9B' }}
              component={'span'}
            >
              {diffDays}
            </Typography>
            日
          </div>
          {/* 妊娠週数 */}
          {/* <h3>{diffWeeks}</h3> */}
          {/* <Typography
            variant="h4"
            sx={{
              border: 2,
              padding: 4,
              borderRadius: 14,
              borderColor: '#E4AF9B',
              padding: '40px',
              // display: 'inline-block',
            }}
          > */}
          {/* <Box
            sx={{
              border: 4,
              borderColor: '#E4AF9B7',
              padding: 4,
              borderRadius: 4,
            }}
          > */}
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: 'inline-block',
              color: '#E4AF9B7',
            }}
          >
            <Typography
              className="ttlUnder"
              variant="display: inline-block;"
              sx={{ color: '#705040', fontSize: '1.7rem' }}
            >
              今月のママへのメッセージ
            </Typography>
            <Typography variant="p" sx={{ color: '#705040' }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: valuesMessage?.message,
                }}
              />
            </Typography>
            {/* </Box> */}
          </Paper>
        </Box>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default Baby;
