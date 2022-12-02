import Link from 'next/link';
import useSWR, { useSWRConfig } from 'swr';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { db, withIDConverter } from '../firebase';
import Stack from '@mui/material/Stack';

import {
  doc,
  collection,
  query,
  orderBy,
  where,
  documentId,
} from 'firebase/firestore';
import { Button, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
            <Paper elevation={3} sx={{ padding: 2, margin: 4 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <div key={index}>
                  <Link href={`question/${question.id}`}>
                    <a>
                      <Typography
                        variant="p"
                        sx={{ color: '#705040' }}
                      >
                        Q.{question.query}
                      </Typography>
                    </a>
                  </Link>
                </div>
                <ArrowForwardIosIcon />
              </Stack>
            </Paper>
          </>
        );
      })}
    </ul>
  );
}

export default QuestionList;
