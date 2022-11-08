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

const Register = () => {
  const router = useRouter();
  const initialValues = {
    username: '',
    mailAddress: '',
    password: '',
    birthDate: '',
  };
  const [formValues, setFormvalues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const handleChange = (e) => {
    // console.log(e.target.value);

    const { name, value } = e.target;
    setFormvalues({ ...formValues, [name]: value });
    console.log(formValues);
  };
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
      if (user) {
        // firestoreにユーザーのデータを保存
        await setDoc(doc(db, 'user', user.user.uid), {
          username: formValues.username,
          birthDate: moment(
            formValues.birthDate,
            'YYYY/MM/DD'
          ).toDate(),
        });
        // 登録成功時の処理
        // 登録が終わったらログイン画面に遷移する
        router.push('/login');
      } else if (error) {
        // 登録失敗時の処理
        console.log(error.message);
      }
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

  const [isRevealPassword, setIsRevealPassword] = useState(false);

  return (
    <DefaultLayout>
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
            value={formValues.username}
            onChange={(e) => {
              setFormvalues({
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
            value={formValues.mailAddress}
            onChange={(e) => {
              setFormvalues({
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
            value={formValues.password}
            // パスワードを目隠しする
            type={isRevealPassword ? 'text' : 'password'}
            onChange={(e) => {
              setFormvalues({
                ...formValues,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <DatePicker
            error={formErrors.birthDate}
            helperText={formErrors.birthDate}
            id="outlined-basic"
            label="出産予定日"
            variant="outlined"
            margin="dense"
            value={formValues.birthDate}
            // onChange={(e) => {
            //   setFormvalues({
            //     ...formValues,
            //     birthDate: e.target.value,
            //   });
            // }}
            onChange={(newValues) => {
              setFormvalues({
                ...formValues,
                birthDate: newValues.format('YYYY/MM/DD'),
              });
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          sx={'background-color:pink'}
          size="large"
        >
          登録
        </Button>
      </form>
    </DefaultLayout>
  );
};
export default Register;
