import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
      <div className='bg-white p-5 rounded-lg shadow-lg max-w-sm w-full'>
        <button
          className='absolute top-0 right-0 m-2 text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out'
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
