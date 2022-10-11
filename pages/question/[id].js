import { useRouter } from 'next/router';
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { doc, collection, query, orderBy, where, documentId } from "firebase/firestore";

export default function Question() {
  const router = useRouter();
  const { id } = router.query;

  // questionsコレクションの中にドキュメントID=1のデータがある想定
  // /question/1にアクセスするとidに1がはいる

  const [values, loading, error, snapshot] = useDocumentData(
    // dbの中のquestionsコレクションの中のIDがidのドキュメントを取得
    // 第3引数は必須だがidはすぐに設定されるわけではないので、ダミーの文字列を設定しておく
    doc(db, "questions", id ?? "dummy")
  );

  // // 一覧画面等でquestionsコレクションの中の複数のドキュメントを取得するケース
  // const [values, loading, error, snapshot] = useCollectionData(
  //   query(
  //     collection(db, "questions"),
  //     // whereやorderByで検索条件や並び順を指定することも出来る(ID指定なら以下のような指定)
  //     // ※条件を渡さないことも可能
  //     where(documentId(), "==", "1"),
  //   )
  // );

  if (loading) {
    return <>loading...</>;
  }

  return (
    <h1>
      {/* values.xxxはfirestoreで登録したフィールド */}
      {values.test}
    </h1>
  );
}

// import { useState } from 'react';
// import DefaultLayout from '../../components/layout/DefaultLayout';
// export async function getStaticProps({ params }) {
//   const res = await fetch(
//     `http://localhost:8000/question/${params.id} `
//   );
//   const question = await res.json();

//   return {
//     props: {
//       questions: question,
//     },
//   };
// }

// export async function getQuestionIds() {
//   const questions = await fetch(
//     'http://localhost:8000/question'
//   ).then((res) => res.json());

//   return questions.map((question) => {
//     return {
//       params: {
//         id: question.id.toString(),
//       },
//     };
//   });
// }

// export async function getStaticPaths() {
//   const paths = await getQuestionIds();

//   return {
//     paths,
//     fallback: false,
//   };
// }
// export default function ItemCreate({ questions }) {
//   const [descText, setDescText] = useState(questions.answer);
//   const onChangeDescText = (event) => setDescText(event.target.value);

//   return (
//     <DefaultLayout>
//       <div>
//         <h1>質問詳細画面</h1>

//         <textarea
//           name="description"
//           cols={40}
//           rows={4}
//           value={descText}
//           onChange={onChangeDescText}
//         ></textarea>
//       </div>
//     </DefaultLayout>
//   );
// }
