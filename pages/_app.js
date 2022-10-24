import CssBaseline from '@mui/material/CssBaseline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/router';
import '../styles/globals.css';
// ログイン状態を確認して、未ログインならログイン画面に飛ばす
const NeedLogin = ({ children }) => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return null;
  }
  // 以下ローディングが終わっている状態

  if (error) {
    // エラーならログに出す
    console.log(error);
    return null;
  }

  // 未ログインで認証な必要なページを開いていたらログイン画面に飛ばす
  if (
    !user &&
    router.pathname !== '/login' &&
    router.pathname !== '/user' &&
    !router.pathname.startsWith('/question')
  ) {
    router.push('/login');
  }

  return <>{children}</>;
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssBaseline />
      <NeedLogin>
        <Component {...pageProps} />
      </NeedLogin>
    </>
  );
}

export default MyApp;
