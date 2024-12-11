import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBMDLld-gAL5V3gv0tRzhSoYznNlYec4pg",
  authDomain: "allscart-user-57aa3.firebaseapp.com",
  projectId: "allscart-user-57aa3",
  storageBucket: "allscart-user-57aa3.firebasestorage.app",
  messagingSenderId: "1019083590296",
  appId: "1:1019083590296:web:65f424f3fdfbaa6eca1eed"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

