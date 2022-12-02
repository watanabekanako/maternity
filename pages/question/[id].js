import { useRouter } from 'next/router';
import {
  useCollectionData,
  useDocumentData,
} from 'react-firebase-hooks/firestore';
import { db } from '../../firebase';
import Container from '@mui/material/Container';
import {
  doc,
  collection,
  query,
  orderBy,
  where,
  documentId,
} from 'firebase/firestore';
import DefaultLayout from '../../components/layout/DefaultLayout';
import Link from 'next/link';
import { Box, Button, Paper, Typography } from '@mui/material';
export default function Question() {
  const router = useRouter();
  const { id } = router.query;

  // questionsコレクションの中にドキュメントID=1のデータがある想定
  // /question/1にアクセスするとidに1がはいる

  const [values, loading, error, snapshot] = useDocumentData(
    // dbの中のquestionsコレクションの中のIDがidのドキュメントを取得
    // 第3引数は必須だがidはすぐに設定されるわけではないので、ダミーの文字列を設定しておく
    doc(db, 'questions', id ?? 'dummy')
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
  console.log(values);
  if (loading) {
    return <>loading...</>;
  }
  return (
    <DefaultLayout>
      <Container maxWidth="md">
        <Box
          textAlign="center"
          sx={{
            marginTop: 10,
            // width: '75%',
          }}
        >
          <Paper sx={{ margin: 2 }}>
            <Typography
              className="ttlUnder"
              sx={{
                margin: 2,
                color: '#705040',
                fontSize: 20,
              }}
            >
              Q,{values.query}
            </Typography>
          </Paper>
          {/* values.xxxはfirestoreで登録したフィールド */}
          {/* {values.test} */}
          <Paper
            sx={{
              padding: 6,
              margin: 2,
              color: '#705040',
              textAlign: 'left',
            }}
          >
            <Typography className="textQuestion" variant="p">
              A.
              <div
                dangerouslySetInnerHTML={{ __html: values.answer }}
              />
            </Typography>
          </Paper>
        </Box>
        <Box textAlign="center" marginBottom={20}>
          <Link href="/question" passHref>
            <Button variant="contained" to="/">
              質問一覧へ戻る
            </Button>
          </Link>
        </Box>
      </Container>
    </DefaultLayout>
  );
}
