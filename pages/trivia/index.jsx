import React from 'react';
import DefaultLayout from '../../components/layout/DefaultLayout';
import TriviaList from '../../components/triviaList';
export default function Trivia() {
  return (
    <>
      <DefaultLayout>
        <h1>妊娠中の豆知識</h1>
        <TriviaList />
      </DefaultLayout>
    </>
  );
}
