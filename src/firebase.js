import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";    // for authentication

const firebaseConfig = {
apiKey: "AIzaSyAeiowI9e1YFdrHiO0T7Zzeid80Q0dcrrk",
  authDomain: "mrpig-ae490.firebaseapp.com",
  projectId: "mrpig-ae490",
  storageBucket: "mrpig-ae490.appspot.com",
  messagingSenderId: "853047416352",
  appId: "1:853047416352:web:ca743adb6b4d06a8740e45",
  measurementId: "G-L7SRE6K57J"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  

  export { auth};