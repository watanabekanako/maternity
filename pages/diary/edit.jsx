import Link from 'next/link';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import React, { useState } from 'react';
import moment from 'moment';
export default function Diary() {
  const [diary, setDiary] = useState();

  const onClickCreate = async () => {
    await setDoc(
      doc(db, 'user', '1', 'diary', moment().format('YYYYMMDD')),
      { diary: diary }
    );
  };
  console.log(db);
  // console.log(values);

  console.log(diary);
  return (
    <DefaultLayout>
      <div>
        <h1>日記</h1>
        <table>
          <tr>
            <th>日付</th>
            <td>
              <input type="text" name="data"></input>
            </td>
          </tr>
          <tr>
            <th>今日の日記</th>
            <td>
              <input
                type="text"
                name="diary"
                value={diary}
                onChange={(e) => {
                  setDiary(e.target.value);
                }}
              />
            </td>
          </tr>
        </table>
        <Link href="../diary">
          <button onClick={() => onClickCreate()}>保存</button>
        </Link>
      </div>
    </DefaultLayout>
  );
}
