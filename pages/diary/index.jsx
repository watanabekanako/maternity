import DiaryList from '../../components/diaryList';
import Head from 'next/head';
import Link from 'next/link';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { Box } from '@mui/material';
export default function DiaryPage() {
  return (
    <>
      <DefaultLayout>
        <Box textAlign="center">
          <h1>日記一覧</h1>
        </Box>
        <DiaryList />
      </DefaultLayout>
    </>
  );
}
