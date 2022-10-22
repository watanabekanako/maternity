import * as React from 'react';
import DefaultLayout from '../../components/layout/DefaultLayout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

const User = () => {
  const initialValues = {
    username: '',
    mailAddress: '',
    password: '',
    birthDate: "",
  };
  const [formValues, setFormvalues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e) => {
    // console.log(e.target.value);

    const { name, value } = e.target;
    setFormvalues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    // バリデーションチェック
  };

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = '名前を入力してください';
    }

    // メールアドレスの検証
    const regex = new RegExp(/^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/);
    if (!values.mailAddress) {
      errors.mailAddress = 'メールアドレスを入力してください';
    } else if (!regex.test(values.mailAddress)) {
      errors.mailAddress = 'メールアドレスのフォーマットが不正です';
    }
    if (!values.password) {
      errors.password = 'パスワードを入力してください';
    } else if (values.password.length < 8) {
      errors.password = "パスワードは8文字以上で入力して下さい"
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
              })
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
            onChange={(e) => {
              setFormvalues({
                ...formValues,
                password: e.target.value,
              });
            }}
          />
        </div>
        <div>
          <TextField
            error={formErrors.birthDate}
            helperText={formErrors.birthDate}
            id="outlined-basic"
            label="出産予定日"
            variant="outlined"
            margin="dense"
            value={formValues.birthDate}
            onChange={(e) => {
              setFormvalues({
                ...formValues,
                birthDate: e.target.value,
              })
            }}
          />
        </div>
        <Button type="submit" variant="contained" onClick={handleSubmit}>
          登録
        </Button>
      </form>
    </DefaultLayout>
  );
};
export default User;
