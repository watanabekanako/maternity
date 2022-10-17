import Link from 'next/link';
import useSWR, { useSWRConfig } from 'swr';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { db } from '../firebase';
import {
  doc,
  collection,
  query,
  orderBy,
  where,
  documentId,
} from 'firebase/firestore';
function DiaryList() {
  // console.log(snapshot);
  const [values, loading, error, snapshot] = useCollectionData(
    collection(db, 'questions').withConverter({
      // toFirestore: (question) => {
      //   return question;
      // },
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
          id: snapshot.id,
          ...data,
        };
      },
    })
  );
  // console.log(values[0].query);
  if (loading) {
    return <>loading...</>;
  }
  return (
    <ul>
      {values.map((question, index) => {
        // console.log(values);
        return (
          <>
            <Paper elevation={3}>
              <li key={index}>
                <li>{question.query}</li>
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
