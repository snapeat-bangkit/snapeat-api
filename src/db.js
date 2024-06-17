import admin from 'firebase-admin';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import config from './config.js';

import serviceAccountKey from '../serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  storageBucket: config.firebaseConfig.storageBucket,
});

const firebaseApp = firebase.initializeApp(config.firebaseConfig);
const auth = firebaseApp.auth();
const firestore = admin.firestore();
const storage = admin.storage();

export { auth, firestore, storage, admin };
export default firebaseApp;
