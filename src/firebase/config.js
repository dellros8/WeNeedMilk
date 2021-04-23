import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyAMtPrZn_V-EFGEU_4YBl50_X2e267FLlo',
  authDomain: 'weneedmilk-9c52f.firebaseapp.com',
  projectId: 'weneedmilk-9c52f',
  storageBucket: 'weneedmilk-9c52f.appspot.com',
  messagingSenderId: '204115003664',
  appId: '1:204115003664:web:742b1033476d516402fd95',
};

firebase.initializeApp(firebaseConfig);
  
const firebaseAuth = firebase.auth();
const firebaseDB = firebase.database();

export { firebaseAuth, firebaseDB };
export default firebase;
