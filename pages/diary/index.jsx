import React from 'react';
import DiaryList from '../../components/diaryList';
import DiaryEdit from '../../components/DiaryEdit';
import Head from 'next/head';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { Box, Modal } from '@mui/material';
import { Button } from '@mui/material';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Pagination from '@mui/material/Pagination';
import Link from 'next/link';
export default function DiaryPage() {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  // モーダル
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // ページング機能
  const handlePrevPage = () => {};
  const handleNextPage = () => {};

  //検索機能

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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <DiaryEdit onClickSave={handleClose} />
            </Box>
          </Modal>
          <Pagination count={10} per={10} />
        </Box>
      </DefaultLayout>
    </>
  );
}
