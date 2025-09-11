import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// WEB APP CONFIG (safe for client-side)
// Get this from Firebase Console → Project Settings → General → Your apps → Web app
const firebaseConfig = {
  apiKey: "your-web-api-key-from-firebase-console",
  authDomain: "inquest-of-knowledge.firebaseapp.com",
  projectId: "inquest-of-knowledge",
  storageBucket: "inquest-of-knowledge.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Note: This config is SAFE to put directly in code
// It's designed for client-side use and doesn't give admin access

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

export default app;
