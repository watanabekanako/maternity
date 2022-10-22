import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import moment from 'moment';
import useSWR from 'swr';
import DefaultLayout from '../components/layout/DefaultLayout';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import {auth, db} from '../firebase';
import {
  doc,
  collection,
  query,
  orderBy,
  where,
  documentId,
} from 'firebase/firestore';
import {useAuthState} from "react-firebase-hooks/auth";
// const fetcher = (url) => fetch(url).then((res) => res.json());

const Baby = () => {
  const [user, loadingUser, errorUser] = useAuthState(auth);

  const [values, loading, error, snapshot] = useDocumentData(
    // dbの中のquestionsコレクションの中のIDがidのドキュメントを取得
    // 第3引数は必須だがidはすぐに設定されるわけではないので、ダミーの文字列を設定しておく
    doc(db, 'user', user.uid ?? 'dummy')
  );

  // console.log(values[0].query);
  if (loading) {
    return <>loading...</>;
  }
  // console.log(moment.unix(values.birthDate.seconds));
  // console.log(data);
  // const moment = require('moment');
  const m1 = moment.unix(values.birthDate.seconds);

  const m2 = moment();
  const diff = m1.diff(m2, 'days');

  return (
    <React.Fragment>
      <DefaultLayout style={{ color: 'red' }}>
        <React.Fragment>
          <CssBaseline />
          <p>出産予定日まであと{diff}日</p>
        </React.Fragment>
      </DefaultLayout>
    </React.Fragment>
  );
};

export default Baby;
