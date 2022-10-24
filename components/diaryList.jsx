import Link from 'next/link';
import useSWR, { useSWRConfig } from 'swr';
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
  const [user, loadingUser, errorUser] = useAuthState(auth);
  const [values, loading, error, snapshot] = useCollectionData(
    query(
      collection(db, 'user', user?.uid ?? 'dummy', 'diary')
    ).withConverter(withIDConverter)
  );
  // console.log(values[0].query);
  if (loading) {
    return <>loading...</>;
  }
  return (
    <ul>
      {values.map((diary, index) => {
        // console.log(diary);
        return (
          <>
            <Paper elevation={3}>
              <li key={index}>
                <li>{diary}</li>
                <Link href={`question/${question.id}`}>
                  <a>詳しくはこちら</a>
                </Link>
              </li>
            </Paper>
          </>
        );
      })}
    </ul>
  );
}

export default DiaryList;
