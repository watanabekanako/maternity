import { collection } from 'firebase/firestore';
import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db, withIDConverter } from '../firebase';
function TriviaList() {
  const [values, loading, error, snapshot] = useCollectionData(
    collection(db, 'trivians').withConverter(withIDConverter)
  );
  if (loading) {
    return <>loading</>;
  }
  return (
    <ul>
      {values.map((trivian, index) => {
        // console.log(trivian.query);
        return (
          <>
            <li key={index}>{trivian.query}</li>
          </>
        );
      })}
    </ul>
  );
}
export default TriviaList;
