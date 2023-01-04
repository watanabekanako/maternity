import QuestionList from '../../components/questionList';
import Head from 'next/head';
import Link from 'next/link';
import DefaultLayout from '../../components/layout/DefaultLayout';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, Typography } from '@mui/material';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
export default function Page() {
  return (
    <>
      <DefaultLayout>
        <Box textAlign="center">
          <h1>よくある質問</h1>
          <LiveHelpIcon />
        </Box>
        <Container maxWidth="md">
          <QuestionList />
          <Box textAlign="center"></Box>
        </Container>
      </DefaultLayout>
    </>
  );
}
