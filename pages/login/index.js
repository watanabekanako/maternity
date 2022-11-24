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
import { formatMuiErrorMessage } from '@mui/utils';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const Login = () => {
  const router = useRouter();
  const initialValues = {
    mailAddress: '',
    password: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [
    signInWithEmailAndPassword,
    // ログインして返ってきたユーザーの情報
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  React.useEffect(() => {
    // ユーザーがある = ログインできた時の処理
    if (user) {
      router.push('/baby');
    }
  }, [user]);
  const handleLogin = async (e) => {
    e.preventDefault();
    // 必要に応じてバリデーション
    const errors = validate(formValues);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      // ログイン処理
      await signInWithEmailAndPassword(
        formValues.mailAddress,
        formValues.password
      );
    }
  };
  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };
  // バリデーションチェック
  const validate = (values) => {
    const errors = {};
    // メールアドレスの検証
    const regex = new RegExp(
      /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
    );
    if (!values.mailAddress) {
      errors.mailAddress = 'メールアドレスを入力してください';
    } else if (!regex.test(values.mailAddress)) {
      errors.mailAddress = 'メールアドレスのフォーマットが不正です';
    }
    if (!values.password) {
      errors.password = 'パスワードを入力してください';
    } else if (values.password.length < 8) {
      errors.password = 'パスワードは8文字以上で入力して下さい';
    }
    return errors;
  };

  // パスワードを表示するかどうか
  const [isRevealPassword, setIsRevealPassword] = useState(true);

  const handleMouseDownPassword = (event) => {
    //マウスダウンしたときの挙動制御
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    // 目隠しボタンをクリックした時の処理
    // set関数の引数には更新したい状態を渡す
    setIsRevealPassword(!isRevealPassword);
  };
  return (
    <DefaultLayout>
      <Box textAlign="center">
        <h1>ログインページ</h1>
        <div>
          <TextField
            error={formErrors.mailAddress}
            helperText={formErrors.mailAddress}
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
            error={formErrors.password}
            helperText={formErrors.password}
            id="outlined-basic"
            label="パスワード"
            variant="outlined"
            margin="dense"
            name="password"
            sx={{ width: 600, marginBottom: 5 }}
            value={formValues.password}
            // パスワードを目隠しする
            type={isRevealPassword ? 'text' : 'password'}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <FormControl>
            <InputLabel htmlFor="outlined-adornment-password">
              パスワード
            </InputLabel>
            <OutlinedInput
              error={formErrors.password}
              helperText={formErrors.password}
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
