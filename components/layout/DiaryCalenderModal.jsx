import Link from 'next/link';

import { doc, setDoc } from 'firebase/firestore';

import React, { useState } from 'react';
import moment from 'moment';
import { Button, Stack, TextField, Modal } from '@mui/material';
import { Box } from '@mui/system';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import { DatePicker } from '@mui/x-date-pickers';
import { useAuthState } from 'react-firebase-hooks/auth';

const DiaryCalenderModal = ({ open, onClose, description }) => {
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    {/* <Box sx={modalInnerBoxStyle}> */}
    <Box textAlign="center" sx={{ p: '32px' }}>
      <p>{description}</p>
      <Stack spacing={2}>
        <DatePicker
          // error={formErrors.birthDate}
          // helperText={formErrors.birthDate}
          id="outlined-basic"
          label="日付"
          sx={{ width: 600 }}
          variant="outlined"
          margin="dense"
          //   value={date}
          onChange={(value) => {
            setDate(value);
          }}
          renderInput={(params) => <TextField {...params} />}
        />

        <TextField
          type="text"
          name="diary"
          //   value={diary}
          onChange={(e) => {
            setDiary(e.target.value);
          }}
        />
        <div>
          <Button variant="contained" onClick={() => onClickCreate()}>
            編集する
          </Button>
        </div>
      </Stack>
    </Box>
    {/* </Box> */}
  </Modal>;
};

export default DiaryCalenderModal;
