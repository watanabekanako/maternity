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
import { db, withIDConverter, auth } from '../../firebase';
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
import { useAuthState } from 'react-firebase-hooks/auth';
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
  const [user, loadingUser, errorUser] = useAuthState(auth);
  const [values, loading, error, snapshot] = useCollectionData(
    query(
      collection(db, 'user', user?.uid ?? 'dummy', 'temperature')
    ).withConverter(withIDConverter)
  );
  console.log(values);
  const first = moment().startOf('month');
  const end = moment().endOf('month');
  const diff = end.diff(first, 'days');
  const labels = newArray(diff + 1)
    .fill(undefined)
    .map((_val, idx) => {
      return moment(first).add(idx, 'days').format('YYYYMMDD');
    });

  const temList = labels.map((date, index) => {
    return values?.find((value) => value.id === date)?.temperature;
  });
  const data = {
    labels,
    datasets: [
      {
        label: '体温',
        data: temList,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        spanGaps: true,
      },
    ],
  };
  return (
    <>
      <DefaultLayout style={{}}>
        <Line options={options} data={data} />
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
