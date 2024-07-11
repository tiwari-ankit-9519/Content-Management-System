import React from "react";

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white text-center p-4'>
      <div className='container mx-auto'>
        <p className='text-sm'>
          © {new Date().getFullYear()} Intellipaat. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
