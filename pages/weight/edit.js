import Link from 'next/link';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { doc, setDoc } from 'firebase/firestore';
import {
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
export default function WeightEdit({ weight }){
  const [values, loading, error, snapshot] = useDocumentData(
    doc(db, 'user', weight ?? 'dummy')
  );
  // await setDoc(doc(db, 'users', 'weight'), {});
  if (loading) {
    return <>loading...</>;
  }
  
  const onClickCreate = async () => {
    await setDoc(doc(db, 'user', 'weight'), {});
  };
  // console.log(db);
  // console.log(values);
  return (
    <DefaultLayout>
      <div>
        <h1>体重管理</h1>
        <table>
          <tr>
            <th>日付</th>
            <td>
              <input type="text" name="data"></input>
            </td>
          </tr>
          <tr>
            <th>体重</th>
            <td>
              <input type="text" name="weight">
                {/* {db} */}
              </input>
            </td>
          </tr>
        </table>
        <Link href="">
          <button onClick={() => onClickCreate()}>保存</button>
        </Link>
      </div>
    </DefaultLayout>
  );
}
