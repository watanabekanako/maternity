import Link from 'next/link';
import useSWR, { useSWRConfig } from 'swr';
import * as React from 'react';
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
import { Button } from '@mui/material';
function QuestionList() {
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

  console.log(values);
  console.log(loading);
  if (loading) {
    return <>loading...</>;
  }
  return (
    <ul>
      {values?.map((question, index) => {
        // console.log(values);
        return (
          <>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 5 }}>
              <div key={index}>
                <Link href={`question/${question.id}`}>
                  <a>
                    <div>{question.query}</div>
                  </a>
                </Link>

                {/* <Box sx={{ backgroundColor: 'pink' }}>
                  <Link href={`question/${question.id}`}>
                    <a>詳しくはこちら</a>
                  </Link>
                </Box> */}
              </div>
            </Paper>
          </>
        );
      })}
    </ul>
  );
}

export default QuestionList;
