import * as React from 'react';
import DefaultLayout from '../../components/layout/DefaultLayout';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useRouter } from 'next/router';
import { doc, setDoc } from 'firebase/firestore';
import moment from 'moment';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { DatePicker } from '@mui/x-date-pickers';
import { Box } from '@mui/material';
const Edit = () => {
  const [user, loadingUser, errorUser] = useAuthState(auth);

  const initialValues = {
    birthDate: '',
    username: '',
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const [values, loading, error, snapshot] = useDocumentData(
    doc(db, 'user', user?.uid ?? 'dummy')
  );
  // console.log(values.username);
  React.useEffect(() => {
    if (values?.birthDate || values?.username) {
      setFormValues({
        ...formValues,
        birthDate: moment
          .unix(values.birthDate.seconds)
          .format('YYYY/MM/DD'),
        username: values.username,
      });
    }
  }, [values?.birthDate]);
  // values.birthDateの中身が変わったら実行する

  const handleSubmit = async (e) => {
    e.preventDefault();
    // バリデーションチェック
    const errors = validate(formValues);
    if (Object.keys(errors).length > 0) {
      // エラーがあればformErrorsにセット
      setFormErrors(errors);
    } else {
      // authentication
      if (user) {
        // firestoreにユーザーのデータを保存
        await setDoc(
          doc(db, 'user', user.uid),
          {
            birthDate: moment(
              formValues.birthDate,
              'YYYY/MM/DD'
            ).toDate(),
            username: formValues.username,
          },
          {
            merge: true,
          }
        );
        console.log('success');
      } else if (error) {
        // 登録失敗時の処理
        console.log(error.message);
      }
    }
  };

  const validate = (values) => {
    const errors = {};
    return errors;
  };

  return (
    <DefaultLayout>
      <Box textAlign="center">
        <h1>ユーザー情報編集</h1>
        <form>
          <div>
            <TextField
              label="名前"
              error={formErrors.username}
              helperText={formErrors.username}
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              name="username"
              sx={{ width: 600, marginBottom: 5 }}
              // value={values?.username}
              value={formValues?.username}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  username: e.target.value,
                });
                console.log(e.target.value);
              }}
            />
          </div>
          <div>
            <DatePicker
              sx={{ width: 600, marginBottom: 5 }}
              label="出産予定日"
              error={formErrors.birthDate}
              helperText={formErrors.birthDate}
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              value={moment(formValues.birthDate, 'YYYY/MM/DD')}
              onChange={(newValue) => {
                setFormValues({
                  ...formValues,
                  birthDate: newValue.format('YYYY/MM/DD'),
                });
              }}
              renderInput={(params) => (
                <TextField {...params} sx={{ width: 600 }} />
              )}
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit}
            sx={{ marginTop: 4 }}
          >
            更新
          </Button>
        </form>
      </Box>
    </DefaultLayout>
  );
};
export default Edit;
