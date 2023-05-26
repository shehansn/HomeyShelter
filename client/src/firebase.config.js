import {getApp,getApps,initializeApp } from 'firebase/app'
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyB5XIwF7_nlUSIKw8LjmEMCRR-EzYreC3s",
    authDomain: "my-react-app-ae693.firebaseapp.com",
    databaseURL: "https://my-react-app-ae693-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "my-react-app-ae693",
    storageBucket: "my-react-app-ae693.appspot.com",
    messagingSenderId: "663704112498",
    appId: "1:663704112498:web:98b3383b8083e196c521eb",
    measurementId: "G-DFD89CX6WB"
  };

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, firestore, storage ,auth};