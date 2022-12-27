import React from 'react';
import DiaryList from '../../components/diaryList';
import DiaryEditModal from '../../components/DiaryEditModal';
import Head from 'next/head';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { Box, Modal } from '@mui/material';
import { Button } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Pagination from '@mui/material/Pagination';
import Link from 'next/link';
export default function DiaryPage() {
  const [open, setOpen] = React.useState(false);
  // モーダル
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // ページング機能
  const handleChange = (page) => {};

  return (
    <>
      <DefaultLayout>
        <Box textAlign="center">
          <h1>
            日記
            <NoteAltIcon fontSize="large" />
          </h1>

          <>
            <p>一日の振り返りに日記を記入してみましょう。</p>
            <p>
              体調の変化やその日の出来事など書いておくと、あとから振り返ることができますよ。
            </p>
          </>

          <DiaryList />
          <Button
            variant="contained"
            sx={{ margin: 4 }}
            onClick={handleOpen}
          >
            日記を登録する
          </Button>
          <DiaryEditModal
            open={open}
            onClose={handleClose}
            description={"日付と今日の体調や出来事を記入してね！"}
          />
          <Pagination
            count={10}
            per={10}
            onChange={(e) => handleChange(e.page)}
          />
        </Box>
      </DefaultLayout>
    </>
  );
}
