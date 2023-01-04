import '../styles/globals.css';
import CssBaseline from '@mui/material/CssBaseline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { useRouter } from 'next/router';
import theme from '../theme';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../createEmotionCache';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
const clientSideEmotionCache = createEmotionCache();
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
    router.pathname !== '/register' &&
    !router.pathname.startsWith('/question') &&
    router.pathname !== '/'
  ) {
    router.push('/login');
  }

  return <>{children}</>;
};

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=M+PLUS+1p"
          rel="stylesheet"
        />
      </Head>
      <LocalizationProvider
        dateAdapter={AdapterMoment}
        dateFormats={{
          fullDateTime24h: 'YYYYMMDD HH:mm',
        }}
      >
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <NeedLogin>
              <Component {...pageProps} />
            </NeedLogin>
          </ThemeProvider>
        </CacheProvider>
      </LocalizationProvider>
    </>
  );
}

export default MyApp;
