import * as React from 'react';
import DefaultLayout from '../../components/layout/DefaultLayout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Box } from '@mui/system';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
  };
  const [passwordType, setPasswordType] = useState('');

  React.useEffect(() => {
    // ユーザーがある = ログインできた時の処理
    if (user) {
      router.push('/baby');
    }
  }, [user]);

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
            sx={{ width: 600 }}
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
            sx={{ width: 600, margin: 10 }}
            type="passwordType"
            value={formValues.password}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                password: e.target.value,
              });
            }}
          />
          {passwordType === 'password' && (
            <VisibilityOffIcon
              onClick={() => setPasswordType('text')}
              className="Password__visual"
            />
          )}
          {/* // 表示 */}
          {passwordType === 'text' && (
            <VisibilityIcon
              onClick={() => setPasswordType('password')}
              className="Password__visual"
            />
          )}
        </div>
        <Button variant="contained" onClick={handleLogin}>
          ログイン
        </Button>
      </Box>
    </DefaultLayout>
  );
};
export default Login;
