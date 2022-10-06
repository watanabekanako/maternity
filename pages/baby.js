import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import moment from 'moment';
import useSWR from 'swr';

// const fetcher = (url) => fetch(url).then((res) => res.json());

const Baby = () => {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    'http://localhost:8000/user/1',
    fetcher
  );
  if (!data) {
    return <>loading ...</>;
  }
  console.log(data);
  // const moment = require('moment');
  const m1 = moment(data.birthDate);
  const m2 = moment(moment().format('YYYY-MM-DD'));
  const diff = m1.diff(m2, 'days');

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <p>出産予定日まであと{diff}日</p>
      </Container>
    </React.Fragment>
  );
};

export default Baby;
