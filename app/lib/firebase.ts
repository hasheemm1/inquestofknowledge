// Firebase Admin SDK for server-side operations
import admin from 'firebase-admin';

// Initialize Firebase Admin (server-side only)
if (!admin.apps.length) {
  // Use your service account file directly
  const serviceAccount = require('../../serviceAccount.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "inquest-of-knowledge",
  });
}

// Initialize Firestore using Admin SDK
export const db = admin.firestore();

export default admin;
