import QuestionList from '../../components/questionList';
import Head from 'next/head';
import Link from 'next/link';
import DefaultLayout from '../../components/layout/DefaultLayout';
export default function Page() {
  return (
    <>
      <DefaultLayout>
        <h1>よくある質問</h1>
        <QuestionList />
      </DefaultLayout>
    </>
  );
}
