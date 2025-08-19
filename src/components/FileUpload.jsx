// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUpload = ({ onUploadSuccess }) => {
//   const [file, setFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState('');

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (!selectedFile) return;

//     // Reset previous errors
//     setError('');

//     // Validate file type by extension
//     const fileExt = selectedFile.name.split('.').pop().toLowerCase();
//     const validExtensions = ['png', 'jpg', 'jpeg'];
    
//     if (!validExtensions.includes(fileExt)) {
//       setError('Please upload a PNG, JPEG, or JPG file');
//       return;
//     }

//     // Validate file size (max 5MB)
//     if (selectedFile.size > 5 * 1024 * 1024) {
//       setError('File size must be less than 5MB');
//       return;
//     }

//     setFile(selectedFile);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError('Please select a file first');
//       return;
//     }

//     setIsUploading(true);
//     setError('');

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       console.log('Starting upload...');
      
//       const response = await axios.post('https://handwriting-backend-239409431927.asia-south1.run.app/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         },
//         timeout: 120000  // 120 seconds (matches backend timeout)
//       });

//       console.log('Upload response:', response.data);
      
//       if (response.data.status === 'success') {
//         onUploadSuccess(response.data);
//       } else {
//         throw new Error(response.data.error || 'Processing failed');
//       }
//     } catch (err) {
//       console.error('Upload error:', err);
      
//       let errorMsg = 'Upload failed';
//       if (err.code === 'ECONNABORTED') {
//         errorMsg = 'The request took too long. Try a smaller image or check your connection.';
//       } else if (err.response) {
//         errorMsg = err.response.data?.error || `Server error: ${err.response.status}`;
//       } else if (err.message) {
//         errorMsg = err.message;
//       }
      
//       setError(errorMsg);
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <div style={{ 
//       padding: '20px', 
//       maxWidth: '500px', 
//       margin: '0 auto',
//       border: '1px solid #ddd',
//       borderRadius: '8px'
//     }}>
//       <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Upload Handwriting Sample</h2>
      
//       <div style={{ marginBottom: '20px' }}>
//         <input
//           type="file"
//           onChange={handleFileChange}
//           accept=".png,.jpg,.jpeg"
//           disabled={isUploading}
//           style={{ 
//             marginBottom: '10px',
//             width: '100%',
//             padding: '10px',
//             border: '1px solid #ddd',
//             borderRadius: '4px'
//           }}
//         />
//         <button
//           onClick={handleUpload}
//           disabled={isUploading || !file}
//           style={{
//             padding: '10px 20px',
//             backgroundColor: isUploading || !file ? '#cccccc' : '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '4px',
//             cursor: isUploading || !file ? 'not-allowed' : 'pointer',
//             width: '100%'
//           }}
//         >
//           {isUploading ? 'Processing...' : 'Upload Image'}
//         </button>
//       </div>

//       {error && (
//         <div style={{ 
//           color: 'red', 
//           margin: '10px 0',
//           padding: '10px',
//           border: '1px solid red',
//           borderRadius: '4px',
//           backgroundColor: '#ffeeee'
//         }}>
//           {error}
//         </div>
//       )}

//       {file && (
//         <div style={{ 
//           marginTop: '20px',
//           padding: '10px',
//           border: '1px solid #eee',
//           borderRadius: '4px'
//         }}>
//           <h4 style={{ marginTop: 0 }}>Selected File:</h4>
//           <p><strong>Name:</strong> {file.name}</p>
//           <p><strong>Size:</strong> {(file.size / 1024).toFixed(1)} KB</p>
//           <p><strong>Type:</strong> {file.type || file.name.split('.').pop().toUpperCase()}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;
