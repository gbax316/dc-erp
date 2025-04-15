import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
export function initializeFirebase() {
  if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Replace line breaks in the private key
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      });
      
      console.log('Firebase Admin SDK initialized successfully');
    } catch (error) {
      console.error('Error initializing Firebase Admin SDK:', error);
    }
  }
  
  return admin;
}

// Export the Firestore database
export const getFirestore = () => {
  if (!admin.apps.length) {
    initializeFirebase();
  }
  
  return admin.firestore();
}; 