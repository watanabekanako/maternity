import * as React from 'react';
import DefaultLayout from '../../components/layout/DefaultLayout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
const Login = () => {
  const router = useRouter();
  const [formValues, setFormValues] = React.useState({});

  const [
    signInWithEmailAndPassword,
    // ログインして返ってきたユーザーの情報
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const handleLogin = async () => {
    // 必要に応じてバリデーション

    // ログイン処理
    await signInWithEmailAndPassword(
      formValues.mailAddress,
      formValues.password
    );
    if (user) {
      console.log(user);
      // ログイン成功
      router.push('/baby');
    } else if (error) {
      // エラーハンドリング
    }
  };

  return (
    <DefaultLayout>
      <Box textAlign="center">
        <h1>ログインページ</h1>
        <div>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            margin="dense"
            value={formValues.mailAddress}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                mailAddress: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="パスワード"
            variant="outlined"
            margin="dense"
            type="password"
            value={formValues.password}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                password: e.target.value,
              });
            }}
          />
        </div>
        <Button variant="contained" onClick={handleLogin}>
          ログイン
        </Button>
      </Box>
    </DefaultLayout>
  );
};
export default Login;
