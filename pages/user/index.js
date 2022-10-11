import * as React from 'react';
import DefaultLayout from '../../components/layout/DefaultLayout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const User = () => {
  // メールアドレス正規表現チェック
  const userEmail =
    /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

  return (
    <DefaultLayout>
      <h1>ユーザー登録</h1>
      <div>
        <TextField
          id="outlined-basic"
          label="名前"
          variant="outlined"
          margin="dense"
        />
      </div>
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
      <div>
        <TextField
          id="outlined-basic"
          label="出産予定日"
          variant="outlined"
          margin="dense"
        />
      </div>
      <Button variant="contained">登録</Button>
    </DefaultLayout>
  );
};
export default User;
