import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DefaultLayout from '../../components/layout/DefaultLayout';
export default function SimplePaper() {
  return (
    <DefaultLayout>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 500,
            height: 500,
          },
        }}
      >
        {/* <Paper elevation={0} />
        <Paper /> */}
        <Paper elevation={3}>ssssssssss</Paper>
      </Box>
    </DefaultLayout>
  );
}
