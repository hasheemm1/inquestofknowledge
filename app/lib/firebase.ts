// Firebase Admin SDK for server-side operations
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

// Initialize Firebase Admin (server-side only)
if (!admin.apps.length) {
  // Read service account file
  const serviceAccountPath = join(process.cwd(), 'serviceAccount.json');
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "inquest-of-knowledge",
  });
}

// Initialize Firestore using Admin SDK
export const db = admin.firestore();

export default admin;
