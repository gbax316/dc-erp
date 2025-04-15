import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase.config';

/**
 * Uploads an image to Firebase Storage and returns the download URL
 * @param file Image file to upload
 * @param path Storage path (e.g., 'logos/main-logo.jpg')
 * @returns Promise with the download URL
 */
export const uploadImage = async (file: File, path: string): Promise<string> => {
  try {
    // Create storage reference
    const storageRef = ref(storage, path);
    
    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Validates file type and size
 * @param file File to validate
 * @param maxSizeMB Maximum size in MB
 * @returns Boolean indicating if file is valid
 */
export const validateImage = (file: File, maxSizeMB = 2): boolean => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    return false;
  }
  
  // Check file size (convert MB to bytes)
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return false;
  }
  
  return true;
}; 