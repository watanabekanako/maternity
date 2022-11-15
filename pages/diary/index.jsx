import DiaryList from '../../components/diaryList';
import Head from 'next/head';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Link from 'next/link';
export default function DiaryPage() {
  return (
    <>
      <DefaultLayout>
        <Box textAlign="center">
          <h1>
            日記一覧
            <NoteAltIcon fontSize="large" />
          </h1>
          {!(<DiaryList />) && (
            <>
              <p>一日の振り返りに日記を記入してみましょう。</p>
              <p>
                体調の変化やその日の出来事など書いておくと、あとから振り返ることができますよ。
              </p>
            </>
          )}
          <DiaryList />

          <Link href="diary/edit" passHref>
            <Button variant="contained">日記を登録する</Button>
          </Link>
        </Box>
      </DefaultLayout>
    </>
  );
}
