import { useRouter } from 'next/router';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import DefaultLayout from '../../components/layout/DefaultLayout';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase';
export default function Trivia() {
  const router = useRouter();
  const { id } = router.query;

  const [values, loading, error, snapshot] = useDocumentData(
    doc(db, 'trivians', id ?? 'dummy')
  );
  console.log(values);
  if (loading) {
    return <>loading...</>;
  }
  return (
    <DefaultLayout>
      <p>{values.query}</p>
      <p>{values.answer}</p>
    </DefaultLayout>
  );
}
