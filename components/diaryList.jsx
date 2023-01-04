// import Link from 'next/link';
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import {
//   useCollectionData,
//   useDocumentData,
// } from 'react-firebase-hooks/firestore';
// import { auth, db, withIDConverter } from '../firebase';
// import {
//   doc,
//   collection,
//   query,
//   orderBy,
//   where,
//   documentId,
//   startAt,
// } from 'firebase/firestore';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import moment from 'moment';
// import { Stack } from '@mui/system';
// import TextField from '@mui/material/TextField';
// import { useState, useEffect } from 'react';
// function DiaryList() {
//   // ログインした状態にて取得したい
//   const [user, loadingUser, errorUser] = useAuthState(auth);
//   // useCollectionDataにて複数のドキュメントを取得する
//   const [values, loading, error, snapshot] = useCollectionData(
//     query(
//       collection(
//         db,
//         'user',
//         user?.uid ?? 'dummy',
//         'diary'
//       ).withConverter(withIDConverter),

//       startAt(page - 1 * per + 1),
//       limit(per)
//     )
//   );

//   // if (loading) {
//   //   return <>loading...</>;
//   // }
//   // ページング機能
//   // firestoreのdaysコレクションの件数と取得
//   // values.lengthで件数の取得;
//   // 検索機能
//   // const products = [
//   //   'aaaaaa',
//   //   'bbbbbbb',

//   // ];

//   // const [keyword, setKeyword] = useState('');
//   // const [showList, setShowList] = useState(false);
//   // const [filteredProducts, setFilteredProducts] = useState(products);
//   // useEffect(() => {
//   //   if (keyword === '') {
//   //     setFilteredProducts(products);
//   //   }

//   //   const searchKeyWords = keyword
//   //     .trim()
//   //     .toLowerCase()
//   //     .match(/[^\s]+/g);

//   //   if (searchKeyWords === null) {
//   //     setFilteredProducts(products);
//   //     return;
//   //   }
//   // });
//   if (loading) {
//     return <>loading...</>;
//   }

//   return (
//     <>
//       {/* <TextField
//         id="field"
//         color="secondary"
//         variant="outlined"
//         label="enter keywords"
//         onChange={(e) => setKeyword(e.target.value)}
//         onClick={() => setShowList(true)}
//       /> */}
//       {values && values?.length > 0 ? (
//         // データがある時
//         <>
//           {values.map((diary, index) => {
//             return (
//               // 既存のコンポーネント
//               <Paper sx={{ padding: 2, margin: 4 }}>
//                 <div>
//                   <div>{diary.id}</div>
//                   <div>{diary.diary}</div>
//                 </div>
//               </Paper>
//             );
//           })}
//         </>
//       ) : (
//         // データが無いとき
//         <>
//           <p>一日の振り返りに日記を記入してみましょう。</p>
//           <p>
//             体調の変化やその日の出来事など書いておくと、あとから振り返ることができますよ。
//           </p>
//           {values.map((diary, index) => {
//             return (
//               // 既存のコンポーネント
//               <Stack>
//                 <Paper sx={{ padding: 2 }}>
//                   <div>
//                     <div>{diary.id}</div>
//                   </div>
//                 </Paper>
//               </Stack>
//             );
//           })}
//         </>
//       )}
//     </>
//   );
// }

// export default DiaryList;
