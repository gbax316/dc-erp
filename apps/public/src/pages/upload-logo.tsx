import { useState, useRef, ChangeEvent } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { uploadImage, validateImage } from '../firebase/uploadImage';
import { useRouter } from 'next/router';

export default function UploadLogo() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);
    
    if (!selectedFile) {
      setFile(null);
      setPreviewUrl(null);
      return;
    }
    
    if (!validateImage(selectedFile)) {
      setError('Please select a valid image file (max 2MB)');
      setFile(null);
      setPreviewUrl(null);
      return;
    }
    
    setFile(selectedFile);
    
    // Create preview URL
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);
    
    // Clean up the object URL when it's no longer needed
    return () => URL.revokeObjectURL(objectUrl);
  };
  
  const handleUpload = async () => {
    if (!file) {
      setError('Please select an image first');
      return;
    }
    
    try {
      setUploading(true);
      setError(null);
      
      // Upload to Firebase Storage
      const url = await uploadImage(file, `logos/dominion-city-logo-${Date.now()}.jpg`);
      
      setDownloadUrl(url);
      setSuccess(true);
      setUploading(false);
    } catch (err) {
      setError('Error uploading image. Please try again.');
      setUploading(false);
      console.error('Upload error:', err);
    }
  };
  
  const resetForm = () => {
    setFile(null);
    setPreviewUrl(null);
    setSuccess(false);
    setDownloadUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Head>
        <title>Upload Logo - Dominion City</title>
        <meta name="description" content="Upload a logo for Dominion City" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {/* Simple Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 shadow-sm sticky top-0 bg-white z-50">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">
            DC
          </div>
          <span className="text-xl font-bold">Dominion City</span>
        </div>
        <button
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          onClick={() => router.push('/')}
        >
          Back to Home
        </button>
      </nav>
      
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm border p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">Upload Church Logo</h1>
          
          {success ? (
            <div className="flex flex-col items-center">
              <div className="text-green-500 font-medium text-center mb-4">
                Logo uploaded successfully!
              </div>
              
              {previewUrl && (
                <div className="relative w-32 h-32 mb-4 mx-auto">
                  <Image 
                    src={previewUrl} 
                    alt="Uploaded logo"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              )}
              
              <p className="mb-4 text-sm text-gray-600">
                Use this URL in your application to display the logo:
              </p>
              
              <div className="p-3 bg-gray-100 rounded-md text-xs overflow-x-auto w-full mb-4">
                <code className="break-all">{downloadUrl}</code>
              </div>
              
              <div className="flex gap-3">
                <button
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 font-medium"
                  onClick={resetForm}
                >
                  Upload Another
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                  onClick={() => router.push('/')}
                >
                  Go to Homepage
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Logo Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                  ref={fileInputRef}
                />
                <p className="mt-1 text-xs text-gray-500">PNG, JPG, or GIF up to 2MB</p>
              </div>
              
              {previewUrl && (
                <div className="mb-4 relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                  <Image 
                    src={previewUrl} 
                    alt="Logo preview" 
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              )}
              
              {error && (
                <div className="mb-4 text-sm text-red-600">
                  {error}
                </div>
              )}
              
              <button
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
                onClick={handleUpload}
                disabled={!file || uploading}
              >
                {uploading ? 'Uploading...' : 'Upload Logo'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 