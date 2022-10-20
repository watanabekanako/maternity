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
    if (!values.mailAddress) {
      errors.mailAddress = 'メールアドレスを入力してください';
    }
    if (!values.password) {
      errors.password = 'パスワードを入力してください';
    }
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
            id="outlined-basic"
            label="名前"
            variant="outlined"
            margin="dense"
            name="username"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <TextField
            id="outlined-basic email"
            label="Email"
            variant="outlined"
            margin="dense"
            name="mailAddress"
          />
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="パスワード"
            variant="outlined"
            margin="dense"
            name="password"
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
      </form>
      <Button variant="contained" onClick={(e) => handleSubmit(e)}>
        登録
      </Button>
    </DefaultLayout>
  );
};
export default User;
