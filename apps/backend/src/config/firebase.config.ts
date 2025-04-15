import { registerAs } from '@nestjs/config';

export default registerAs('firebase', () => {
  const config = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  };

  // Check if we have a Base64 encoded private key
  if (process.env.FIREBASE_PRIVATE_KEY_BASE64) {
    try {
      // Decode the Base64 string to get the original private key
      const privateKey = Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64, 'base64').toString('utf8');
      return {
        ...config,
        privateKey,
      };
    } catch (error) {
      console.error('Error decoding Firebase private key from Base64:', error);
    }
  }

  // Fallback to the regular private key environment variable
  if (process.env.FIREBASE_PRIVATE_KEY) {
    return {
      ...config,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    };
  }

  // Return config without private key if neither is available
  console.warn('No Firebase private key provided. Firebase functionality will be limited.');
  return config;
}); 