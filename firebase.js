import firebase from  'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDpT3x2nKAn9W8sMKc-18U1UGVdg_gq1_M",
    authDomain: "whatsapp-clone-d1ce0.firebaseapp.com",
    projectId: "whatsapp-clone-d1ce0",
    storageBucket: "whatsapp-clone-d1ce0.appspot.com",
    messagingSenderId: "422705759602",
    appId: "1:422705759602:web:dde4916327bcea9d4749eb"
  };

const app= !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = app.firestore()
const auth = app.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {db, auth, provider};