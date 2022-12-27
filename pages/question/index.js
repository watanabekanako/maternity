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
        <Box sx={{ textAlign: 'center' }} className="ttlDashed ">
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ fontSize: '2em', fontWeight: 'bold' }}>
              よくある質問
            </Typography>
            <LiveHelpIcon />
          </Box>
        </Box>
        <Container maxWidth="md">
          <QuestionList />
          <Box textAlign="center"></Box>
        </Container>
      </DefaultLayout>
    </>
  );
}
