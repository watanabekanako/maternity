import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import moment from 'moment';
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

const Baby = () => {
  // 今日の日付と出産予定日の差を出力したい
  // 出産予定日はfetchにて持ってくる
  const { data, error } = useSWR(
    'http://localhost:8000/user',
    fetcher
  );

  const moment = require('moment');
  const m1 = moment('2022/12/20');
  const m2 = moment(moment().format('YYYY-MM-DD'));
  const diff = m1.diff(m2, 'days'); // 396
  data.map((user) => {
    return (
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
          <p>出産予定日まであと{diff}日</p>
          <div>{user.birthDate}</div>
        </Container>
      </React.Fragment>
    );
  });
};
export default Baby;
