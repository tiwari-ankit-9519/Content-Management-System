import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingScreen = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='text-center'>
        <AiOutlineLoading3Quarters className='animate-spin text-6xl mx-auto text-blue-600' />
        <p className='text-xl mt-2 text-gray-700'>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
