// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase';
// import './firebase';

// const db = firebase.firestore();

// function Answer() {
//   const [answer, setAnswer] = useState('');
//   const [query, setQuery] = useState('');

//   useEffect(() => {
//     db.collection('question')
//       .get()
//       .then((snapshot) => {
//         snapshot.forEach((doc) => {
//           const data = doc.data();
//           setAnswer(data.answer);
//           setQuery(data.query);
//         });
//       });
//   }, []);

//   return (
//     <div className="App">
//       <p>回答 : {answer}</p>
//       <br />
//       <p>質問 : {query}</p>
//     </div>
//   );
// }

// export default Answer;
