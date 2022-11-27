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
import { Button } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
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
            <Accordion sx={{ marginBottom: 6 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>
                  <div key={index}>
                    <div>{question.query}</div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div>{question.answer}</div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </>
        );
      })}
    </ul>
  );
}

export default QuestionList;
