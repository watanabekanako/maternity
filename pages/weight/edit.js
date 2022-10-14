import Link from 'next/link';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { doc, setDoc } from 'firebase/firestore';

export default async function WeightEdit({ weight }) {
  const [values, loading, error, snapshot] = useDocumentData(
    doc(db, 'user', weight ?? 'dummy')
  );
  await setDoc(doc(db, 'users', 'weight'), {});
  if (loading) {
    return <>loading...</>;
  }
  //   console.log(doc);
  console.log(values);
  const onClickCreate = () => {};
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
                {values.weight}
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
