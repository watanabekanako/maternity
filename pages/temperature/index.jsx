import React from 'react';
import DefaultLayout from '../../components/layout/DefaultLayout';
import Button from '@mui/material/Button';
import Link from 'next/link';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { db, withIDConverter } from '../../firebase';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import {
  collection,
  documentId,
  onSnapshot,
  orderBy,
  query,
  where,
} from '@firebase/firestore';
import { doc } from 'firebase/firestore';
import moment from 'moment';
import { userAgent } from 'next/server';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const temperatureGraph = () => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '妊娠中の体温',
      },
    },
  };

  // ログインしているuserのIDを取得したい

  const [values, loading, error, snapshot] = useCollectionData(
    query(collection(db, 'user', '1', 'temperature')).withConverter(
      withIDConverter
    )
  );
  console.log(values);
  return (
    <>
      <DefaultLayout style={{}}>
        {/* <Line options={options} data={data} /> */}
        <Button variant="contained" disabled>
          <Link href="../weight/edit.jsx" passHref>
            <a>詳しくはこちら</a>
          </Link>
        </Button>
      </DefaultLayout>
    </>
  );
};

export default temperatureGraph;
