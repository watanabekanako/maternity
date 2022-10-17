import DiaryList from '../../components/diaryList';
import Head from 'next/head';
import Link from 'next/link';
import DefaultLayout from '../../components/layout/DefaultLayout';
export default function DiaryPage() {
  return (
    <>
      <DefaultLayout>
        <h1>日記一覧</h1>
        <DiaryList />
      </DefaultLayout>
    </>
  );
}
