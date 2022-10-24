import Link from 'next/link';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { doc, setDoc } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import React, { useState } from 'react';
import moment from 'moment';
export default function WeightEdit({}) {
  const [weight, setWeight] = useState();

  const onClickCreate = async () => {
    console.log(db);
    await setDoc(
      doc(db, 'user', '1', 'weight', moment().format('YYYYMMDD')),
      { weight: weight }
    );
  };
  console.log(db);
  // console.log(values);

  console.log(weight);
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
              <input
                type="text"
                name="weight"
                value={weight}
                onChange={(e) => {
                  setWeight(Number(e.target.value));
                }}
              />
            </td>
          </tr>
        </table>
        <Link href="../weight">
          <button onClick={() => onClickCreate()}>保存</button>
        </Link>
      </div>
    </DefaultLayout>
  );
}
