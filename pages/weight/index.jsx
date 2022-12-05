import React from 'react';
import DefaultLayout from '../../components/layout/DefaultLayout';
import WeightEdit from '../../components/WeightEdit';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { useAuthState } from 'react-firebase-hooks/auth';
import { Box } from '@mui/material';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
const Graph = () => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const options = {
    responsive: true,
    plugins: {
      // title: {
      //   display: true,
      //   text: '妊娠中の体重管理',
      // },
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

  // 2022/10/1
  const first = moment().startOf('month');
  // 2022/10/31
  const end = moment().endOf('month');
  // 上記の差 = 30
  const diff = end.diff(first, 'days');
  // ログインしているユーザーの商法の取得
  const [user, LoadingUser, ErrorUser] = useAuthState(auth);
  const [values, loading, error, snapshot] = useCollectionData(
    query(
      // collection(db, 'user', '1', 'weight'),
      collection(db, 'user', user?.uid ?? 'dummy', 'weight'),
      // グラフX軸のデータの取得条件
      where(documentId(), '>=', first.format('YYYYMMDD')),
      where(documentId(), '<=', end.format('YYYYMMDD')),
      orderBy(documentId(), 'asc')
    ).withConverter(withIDConverter)
  );
  console.log(values);

  if (loading) {
    return <>Loading...</>;
  }

  // [20221001, 20221002, ...., 20221031]を作りたい
  const labelDisplayFormat = 'MM月DD日';
  const labels = new Array(diff + 1)
    // [undefined, undefined, ...., undefined]
    .fill(undefined)
    .map((_val, idx) => {
      return moment(first)
        .add(idx, 'days')
        .format(labelDisplayFormat);
    });

  const weightList = labels.map((date, index) => {
    // console.log(data.index);
    // if (index === false) {
    //   return values?.find((value) => value.id === date - 1)?.weight;
    // }

    return values?.find(
      // idをYYYYMMDDからMMDDへ文字列へ変換して、labelsと比較する
      (value) => moment(value.id).format(labelDisplayFormat) === date
    )?.weight;
  });

  const data = {
    labels,
    datasets: [
      {
        label: '体重',
        data: weightList,
        borderColor: '#E4AF9B',
        backgroundColor: '#E4AF9B',
        spanGaps: true,
      },
    ],
  };

  return (
    <>
      <DefaultLayout style={{}}>
        <Container maxWidth="md">
          <Box textAlign="center" sx={{ marginBottom: 10 }}>
            <h1>
              体重管理
              <MonitorWeightIcon fontSize="middle" />
            </h1>
            <p>日々の体重を記録しておきましょう！</p>
            <Line options={options} data={data} />
            <Button
              variant="contained"
              onClick={handleOpen}
              sx={{ marginTop: 6 }}
            >
              入力する
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <WeightEdit onClickSave={handleClose} />
              </Box>
            </Modal>
          </Box>
        </Container>
      </DefaultLayout>
    </>
  );
};

export default Graph;
