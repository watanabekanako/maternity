import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  connectFirestoreEmulator,
} from 'firebase/firestore';

// firebaseから取得したconfigを設定
// env.tsに外出しするとなおよしですが、NEXT_PUBLIC_を頭に付ける必要がありそう
// ref: https://www.azukipan.com/posts/firebase-project-config-setting/

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};
// firebaseの設定を初期化
const app = initializeApp(firebaseConfig);
// firestoreの設定
export const db = getFirestore(app);

// DEV
// クライアント側でのみエミュレータに接続する(サーバーサイドでも実行するとエラーになったため)
if (typeof window !== 'undefined') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}
