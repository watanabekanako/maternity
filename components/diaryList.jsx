import Link from 'next/link';
import useSWR, { useSWRConfig } from 'swr';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { db, withIDConverter } from '../firebase';
import {
  doc,
  collection,
  query,
  orderBy,
  where,
  documentId,
} from 'firebase/firestore';
function DiaryList() {
  // const fetcher = (url) => fetch(url).then((res) => res.json());
  // const { data, error } = useSWR(
  //   'http://localhost:8000/question',
  //   fetcher
  // );
  // if (error) return <div>failed to load</div>;

  // if (!data) return <div>loading...</div>;

  // const [values, loading, error, snapshot] = useCollectionData(
  //   query(collection(db, 'questions'))
  // );
  // console.log(snapshot);
  const [values, loading, error, snapshot] = useCollectionData(
    collection(db, 'questions').withConverter(withIDConverter)
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
