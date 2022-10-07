import Link from 'next/link';
import useSWR, { useSWRConfig } from 'swr';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
function QuestionList() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(
    'http://localhost:8000/question',
    fetcher
  );
  if (error) return <div>failed to load</div>;

  if (!data) return <div>loading...</div>;

  return (
    <ul>
      {data.map((question, index) => {
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

export default QuestionList;
