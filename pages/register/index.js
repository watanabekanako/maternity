import * as React from 'react';
import DefaultLayout from '../../components/layout/DefaultLayout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useRouter } from 'next/router';
import { doc, setDoc } from 'firebase/firestore';
import moment from 'moment';
import { DatePicker } from '@mui/x-date-pickers';
import { Box } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const Register = () => {
  const router = useRouter();
  const initialValues = {
    username: '',
    mailAddress: '',
    password: '',
    birthDate: '',
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const handleChange = (e) => {
    // console.log(e.target.value);

    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  React.useEffect(() => {
    if (user) {
      // firestoreにユーザーのデータを保存
      setDoc(doc(db, 'user', user.user.uid), {
        username: formValues.username,
        birthDate: moment(
          formValues.birthDate,
          'YYYY/MM/DD'
        ).toDate(),
      }).then(() => {
        // 登録成功時の処理
        // 登録が終わったらログイン画面に遷移する
        router.push('/login');
      });
    }
  }, [user]);

  console.log(handleSubmit);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // バリデーションチェック
    const errors = validate(formValues);
    if (Object.keys(errors).length > 0) {
      // エラーがあればformErrorsにセット
      setFormErrors(errors);
    } else {
      // 無ければ登録処理

      // authentication
      await createUserWithEmailAndPassword(
        formValues.mailAddress,
        formValues.password
      );
      // if (user) {
      //   // firestoreにユーザーのデータを保存
      //   await setDoc(doc(db, 'user', user.user.uid), {
      //     username: formValues.username,
      //     birthDate: moment(
      //       formValues.birthDate,
      //       'YYYY/MM/DD'
      //     ).toDate(),
      //   });
      //   // 登録成功時の処理
      //   // 登録が終わったらログイン画面に遷移する
      //   router.push('/login');
      // } else if (error) {
      //   // 登録失敗時の処理
      //   console.log(error.message);
      // }
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = '名前を入力してください';
    }

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

  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // メールアドレス正規表現チェック
  // const result = document.getElementById('email');
  // const emailPattern =
  //   /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

  // const submit = () => {};
  const handleMouseDownPassword = (event) => {
    //マウスダウンしたときの挙動制御
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    // set関数の引数には更新したい状態を渡す
    setIsRevealPassword(!isRevealPassword);
  };
  const [isRevealPassword, setIsRevealPassword] = useState(false);

  return (
    <DefaultLayout>
      <Box textAlign="center">
        <h1>ユーザー登録</h1>
        <form>
          <div>
            <TextField
              error={formErrors.username}
              helperText={formErrors.username}
              id="outlined-basic"
              label="名前"
              variant="outlined"
              margin="dense"
              name="username"
              sx={{ width: 600, marginBottom: 5 }}
              value={formValues.username}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  username: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <TextField
              error={formErrors.mailAddress}
              helperText={formErrors.mailAddress}
              id="outlined-basic email"
              label="Email"
              variant="outlined"
              margin="dense"
              name="mailAddress"
              sx={{ width: 600, marginBottom: 5 }}
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
            <FormControl sx={{ width: 600, marginBottom: 5 }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                error={formErrors.password}
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
                      {!isRevealPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {formErrors.password && (
                <FormHelperText error>
                  {formErrors.password}
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div>
            <DatePicker
              error={formErrors.birthDate}
              helperText={formErrors.birthDate}
              id="outlined-basic"
              label="出産予定日"
              sx={{ width: 600 }}
              variant="outlined"
              margin="dense"
              value={formValues.birthDate}
              // onChange={(e) => {
              //   setFormValues({
              //     ...formValues,
              //     birthDate: e.target.value,
              //   });
              // }}
              onChange={(newValues) => {
                setFormValues({
                  ...formValues,
                  birthDate: newValues.format('YYYY/MM/DD'),
                });
              }}
              renderInput={(params) => (
                <TextField sx={{ width: 600 }} {...params} />
              )}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            size="large"
            sx={{ marginTop: 4 }}
          >
            登録
          </Button>
        </form>
      </Box>
    </DefaultLayout>
  );
};
export default Register;
