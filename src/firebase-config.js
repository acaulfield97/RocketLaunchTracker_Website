import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATTzcR2oaQmt9yIa6wc9JPcnanqKp7nxI",
  authDomain: "rocket-launch-tracker-c490b.firebaseapp.com",
  projectId: "rocket-launch-tracker-c490b",
  storageBucket: "rocket-launch-tracker-c490b.appspot.com",
  messagingSenderId: "561432325554",
  appId: "1:561432325554:web:cad1e19778a10318f908ab",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
