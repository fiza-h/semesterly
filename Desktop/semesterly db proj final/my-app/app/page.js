'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import Next.js router for navigation

export default function Home() {
  const [file, setFile] = useState(null); // State to store the file
  const [isClient, setIsClient] = useState(false); // Track if it's on the client-side
  const router = useRouter(); // Next.js hook for navigation

  // Ensure useRouter is used only on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle file drop event
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  // Handle file selection from input
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle form submission (navigate to a new page)
  const handleSubmit = () => {
    if (file) {
      // Redirect to a new page (replace '/new-page' with your target route)
      router.push('/new-page');
    } else {
      alert('Please upload a file before submitting.');
    }
  };

  // Only render the component if it's on the client-side
  if (!isClient) {
    return null; // Avoid SSR issues
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start', // Align content at the top
        alignItems: 'center', // Center horizontally
        height: '100vh',
        paddingTop: '150px', // Add some padding at the top to avoid touching the screen edge
      }}
    >
      <h1
        style={{
          fontWeight: 'bold',
          fontSize: '4rem',
          textAlign: 'center',
          marginBottom: '2px', // Padding between h1 and h2
        }}
      >
        Semesterly
      </h1>

      <h2
        style={{
          marginTop: '2px', // Padding between h1 and h2
          marginBottom: '30px', // Padding between h2 and the drag-and-drop box
          textAlign: 'center',
        }}
      >
        Add your Course Schedule File
      </h2>

      <div
        className="flex items-center justify-center w-full"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()} // Prevent default behavior to allow drop
      >
        {/* Set width of the drag-and-drop box */}
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full max-w-md h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="font-[sans-serif] space-x-4 space-y-4 text-center">
        <button
          type="button"
          className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border border-blue-700 outline-none bg-transparent hover:bg-blue-700 text-blue-700 hover:text-white transition-all duration-300"
          style={{ marginTop: '20px' }} // Padding between the drag-and-drop box and the button
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
