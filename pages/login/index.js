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
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import { ReviewsSharp } from '@mui/icons-material';
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
  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  React.useEffect(() => {
    // ユーザーがある = ログインできた時の処理
    if (user) {
      router.push('/baby');
    }
  }, [user]);

  // パスワードを表示するかどうか
  const [isRevealPassword, setIsRevealPassword] = useState(false);

  const handleClickShowPassword = () => {
    // 目隠しボタンをクリックした時の処理
    // set関数の引数には更新したい状態を渡す
    setIsRevealPassword(!isRevealPassword);
  };
  const handleMouseDownPassword = (event) => {
    //マウスダウンしたときの挙動制御
    event.preventDefault();
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
          <FormControl sx={{ width: 600, margin: 10 }}>
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              label="パスワード"
              margin="dense"
              // 見せる時はテキスト、見せないときはパスワード
              type={isRevealPassword ? 'text' : 'password'}
              value={formValues.password}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  password: e.target.value,
                });
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {formValues.showPassword ? (
                      <VisibilityOffIcon />
                    ) : (
                      <VisibilityIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <Button variant="contained" onClick={handleLogin}>
          ログイン
        </Button>
      </Box>
    </DefaultLayout>
  );
};
export default Login;
