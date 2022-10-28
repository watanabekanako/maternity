import Link from 'next/link';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { auth, db, withIDConverter } from '../firebase';
import {
  doc,
  collection,
  query,
  orderBy,
  where,
  documentId,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
function DiaryList() {
  // ログインした状態にて取得したい
  const [user, loadingUser, errorUser] = useAuthState(auth);
  // useCollectionDataにて複数のドキュメントを取得する
  const [values, loading, error, snapshot] = useCollectionData(
    collection(db, 'diary').withConverter(withIDConverter)
  );
  console.log(values);
  if (loading) {
    return <>loading...</>;
  }
  return (
    <>
      <p>
        {values.map((diary, index) => {
          return (
            <>
              <div key={index}>
                <div>{diary.diary}</div>
              </div>
            </>
          );
        })}
      </p>
    </>
  );
}

export default DiaryList;
