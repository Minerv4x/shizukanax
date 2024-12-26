import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue, get, runTransaction } from "firebase/database";


const firebaseConfig = {
    apiKey: "AIzaSyCqtf-Hb9053ifon_9n2kf7yUfpkXCQXRQ",
    authDomain: "shizukana-e3ae3.firebaseapp.com",
    projectId: "shizukana-e3ae3",
    databaseURL: "https://shizukana-e3ae3-default-rtdb.asia-southeast1.firebasedatabase.app/",
    storageBucket: "shizukana-e3ae3.appspot.com",
    messagingSenderId: "674136763412",
    appId: "1:674136763412:web:4f92da30cb3d27b5008b01",
    measurementId: "G-7JB07LWK40"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Conditionally initialize analytics
let analytics;
if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}
export { database, ref, set, onValue, get, runTransaction, analytics };

