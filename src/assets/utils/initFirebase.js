import fb from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: 'vuejs-presentation.firebaseapp.com',
  databaseURL:
    'https://vuejs-presentation-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'vuejs-presentation',
  storageBucket: 'gs://vuejs-presentation.appspot.com',
  messagingSenderId: '237049669539',
  appId: '1:237049669539:web:7c6898826492567a611c16',
};

const app = fb.initializeApp(firebaseConfig);
export default app;
