import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DefaultLayout from '../components/layout/DefaultLayout';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Link from 'next/link';
// import Answer from './question/Answer';
function ResponsiveAppBar() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const [user] = useAuthState(auth);

  return (
    <React.Fragment>
      <DefaultLayout>
        <React.Fragment>
          <Box textAlign="center">
            <h1>「mama＋」</h1>
            <p>妊婦さんのための便利な機能が揃っています</p>
            <p></p>
            <Grid container spacing={4}>
              <Grid item xs={3}>
                <Item>
                  <h2>出産予定日ガイド</h2>
                  <Image
                    src="/img/diary.png"
                    width={500}
                    height={500}
                  />
                  <p>
                    出産予定日をまでのカウントダウンを行います。簡単に出産までの日付を確認できます。
                  </p>
                </Item>
              </Grid>
              <Grid item xs={3}>
                <Item>
                  <h2>体重管理ガイド</h2>
                  <Image
                    src="/img/diary.png"
                    width={500}
                    height={500}
                  />
                  <p>
                    体重を折線グラフで表示するため、パッと見て体重の増減を確認することができます。
                  </p>
                </Item>
              </Grid>
              <Grid item xs={3}>
                <Item>
                  <h2>日記の記録</h2>
                  <Image
                    src="/img/diary.png"
                    width={500}
                    height={500}
                  />
                  <p>
                    妊娠期間中の日記を登録することができます。日々の体調の変化など後から振り返ることができます。
                  </p>
                </Item>
              </Grid>
              <Grid item xs={3}>
                <Item>
                  <h2>よくある質問</h2>
                  <Image
                    src="/img/diary.png"
                    width={500}
                    height={500}
                  />
                  <p>
                    妊婦さんがよく疑問に感じることを、まとめているため、気になった時に確認することができます。
                  </p>
                </Item>
              </Grid>
            </Grid>
            {!user && (
              <Link href="/register" passHref>
                <Button variant="contained" to="/">
                  新規会員登録はこちらから
                </Button>
              </Link>
            )}
          </Box>
        </React.Fragment>
      </DefaultLayout>
    </React.Fragment>
  );
}
export default ResponsiveAppBar;
