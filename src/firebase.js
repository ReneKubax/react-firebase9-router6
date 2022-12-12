import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB0igspXqDR_g8dgSA28ZzkRNkgKTENZ_4",
  authDomain: "react-2022-3c12a.firebaseapp.com",
  projectId: "react-2022-3c12a",
  storageBucket: "react-2022-3c12a.appspot.com",
  messagingSenderId: "19134864434",
  appId: "1:19134864434:web:a7453169c9c561b1f9302b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {auth}