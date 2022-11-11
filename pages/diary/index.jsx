import DiaryList from '../../components/diaryList';
import Head from 'next/head';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import Link from 'next/link';
export default function DiaryPage() {
  return (
    <>
      <DefaultLayout>
        <Box textAlign="center">
          <h1>日記一覧</h1>
          <DiaryList />
          <Link href="diary/edit" passHref>
            <Button variant="contained">日記を登録する</Button>
          </Link>
        </Box>
      </DefaultLayout>
    </>
  );
}
