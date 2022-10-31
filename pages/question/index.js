import QuestionList from '../../components/questionList';
import Head from 'next/head';
import Link from 'next/link';
import DefaultLayout from '../../components/layout/DefaultLayout';
import Box from '@mui/material/Box';
export default function Page() {
  return (
    <>
      <DefaultLayout>
        <Box textAlign="center">
          <h1>よくある質問</h1>
        </Box>
        <QuestionList />
      </DefaultLayout>
    </>
  );
}
