import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  REACT_APP_API_KEY: 'AIzaSyDkaZVH01uaJY12nS_yit4VQfwudS5w2vg',
  REACT_APP_AUTH_DOMAIN: 'maternity-a3813.firebaseapp.com',
  REACT_APP_PROJECT_ID: 'maternity-a3813',
  REACT_APP_STORE_BUCKET: 'maternity-a3813.appspot.com',
  REACT_APP_MESSAGING_SENDER_ID: '189891415410',
  REACT_APP_APP_ID: '1:189891415410:web:a5a55d49e0905a427521eb',
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
