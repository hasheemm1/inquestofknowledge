# Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Enter project name: `inquestofknowledge-website`
4. Enable Google Analytics (optional)
5. Create project

## Step 2: Enable Firestore

1. In your Firebase project, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (we'll update rules later)
4. Select your preferred location (closest to Kenya: `europe-west1`)

## Step 3: Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click "Web" icon (`</>`)
4. Register app with name: "In Quest of Knowledge Website"
5. Copy the configuration object

## Step 4: Update Firebase Config

Replace the configuration in `app/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-actual-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-actual-app-id"
};
```

## Step 5: Set Up Firestore Security Rules

1. Go to Firestore Database → Rules
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Orders collection - allow read/write
    match /orders/{document} {
      allow read, write: if true;
    }
  }
}
```

**Note**: These are permissive rules for testing. In production, you should implement proper authentication and more restrictive rules.

## Step 6: Test the Connection

1. Start your development server: `npm run dev`
2. Try placing a test order
3. Check Firestore Console to see if the order was created

## Optional: Production Security Rules

For production, consider implementing user authentication and more secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Orders collection - allow creation, limit reads
    match /orders/{document} {
      allow create: if true;
      allow read: if request.auth != null && resource.data.email == request.auth.token.email;
      allow update: if request.auth != null && 
        request.auth.token.admin == true; // For admin updates
    }
  }
}
```

## M-Pesa Integration Notes

The current implementation uses manual M-Pesa confirmation. For automatic integration:

1. Register with Safaricom Daraja API
2. Get API credentials
3. Implement STK Push for automatic payments
4. Set up webhooks for payment notifications

## Backup and Monitoring

1. Set up Firestore backups in Firebase Console
2. Enable monitoring and alerts
3. Consider implementing error tracking (Sentry, LogRocket, etc.)

## Environment Variables

If you want to use environment variables instead of hardcoding Firebase config:

1. Create `.env` file (add to .gitignore)
2. Update `firebase.ts` to use `process.env` variables
3. Set the same variables in your deployment platform
