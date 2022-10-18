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
import { db, withIDConverter } from "../../firebase";
import {useCollectionData, useDocumentData} from 'react-firebase-hooks/firestore';
import {collection, documentId, onSnapshot, orderBy, query, where} from "@firebase/firestore";
import {doc} from "firebase/firestore";

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

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  const data = {
    labels,
    datasets: [
      {
        label: '体重',
        data: [10, 40, 30, 40, 50, 80, 120],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
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
          collection(db, "user", "1", "weight"),
          where(documentId(), ">=", "20221001"),
          where(documentId(), "<=", "20221031"),
          orderBy(documentId(), "asc"),
      ).withConverter(withIDConverter)
  );


  // const [values, loading, error, snapshot] = useCollectionData(
  //   collection(db, "user", "1", 'weight').withConverter({
  //     fromFirestore: (snapshot, options) => {
  //       const data = snapshot.data(options);
  //       return {
  //         id: snapshot.id,
  //         ...data,
  //       };
  //     },
  //   })
  // );
  return (
    <DefaultLayout style={{}}>
      <Line options={options} data={data} />
    </DefaultLayout>
  );
};

export default Graph;
