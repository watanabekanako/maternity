import React from 'react';
import DefaultLayout from '../../components/layout/DefaultLayout';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Graph: React.FC = () => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: '妊娠中の体重管理',
      },
    },
  };

  // const q = query(
  //     collection(db, "user", "1", "weight"),
  //     where(documentId(), ">=", "20221001"),
  //     where(documentId(), "<=", "20221031"),
  //     orderBy(documentId(), "asc"),
  // );
  // firebase純正でやった場合の処理
  // const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //   // こうしたいがforEachしか出来ない
  //   // const weightList = querySnapshot.map((doc) => {
  //   //   return doc.weight;
  //   // });
  //   // setWeightList(weightList);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.data());
  //   });
  // });

  // react-firebase-hooksの処理
  const [values, loading, error, snapshot] = useCollectionData(
    query(
      collection(db, 'user', '1', 'weight'),
      where(documentId(), '>=', '20221001'),
      where(documentId(), '<=', '20221031'),
      orderBy(documentId(), 'asc')
    ).withConverter(withIDConverter)
  );
  console.log(values);

  if (loading) {
    return <>Loading...</>;
  }

  // 2022/10/1
  const first = moment().startOf('month');
  // 2022/10/31
  const end = moment().endOf('month');
  // 上記の差 = 30
  const diff = end.diff(first, 'days');

  // [20221001, 20221002, ...., 20221031]を作りたい

  const labels = new Array(diff + 1)
    // [undefined, undefined, ...., undefined]
    .fill(undefined)
    .map((_val, idx) => {
      return moment(first).add(idx, 'days').format('YYYYMMDD');
    });

  const weightList = labels.map((date, index) => {
    // console.log(data.index);
    // if (index === false) {
    //   return values?.find((value) => value.id === date - 1)?.weight;
    // }
    return values?.find((value) => value.id === date)?.weight;
  });

  const data = {
    labels,
    datasets: [
      {
        label: '体重',
        data: weightList,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        spanGaps: true,
      },
    ],
  };

  return (
    <DefaultLayout style={{}}>
      <Line options={options} data={data} />
    </DefaultLayout>
  );
};

export default Graph;
