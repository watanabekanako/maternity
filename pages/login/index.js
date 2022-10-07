import * as React from 'react';
import DefaultLayout from '../../components/layout/DefaultLayout';
import TextField from '@mui/material/TextField';

const Login = () => {
  return (
    <DefaultLayout>
      <h1>ログインページ</h1>
      <div>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          margin="dense"
        />
      </div>
      <div>
        <TextField
          id="outlined-basic"
          label="パスワード"
          variant="outlined"
          margin="dense"
        />
      </div>
    </DefaultLayout>
  );
};
export default Login;
