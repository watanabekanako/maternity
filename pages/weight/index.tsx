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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { useCollectionData } from 'react-firebase-hooks/firestore';
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
  const [values, loading, error, snapshot] = useCollectionData(
    collection(db, 'weight').withConverter({
      fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return {
          id: snapshot.id,
          ...data,
        };
      },
    })
  );
  return (
    <DefaultLayout>
      <Line options={options} data={data} />
    </DefaultLayout>
  );
};

export default Graph;
