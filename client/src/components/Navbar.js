import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/authSlice";
import Modal from "./Modal";
import LoadingScreen from "./LoadingScreen";
import {
  FaHome,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaUserCircle,
  FaEdit,
  FaTachometerAlt,
} from "react-icons/fa";
import images from "../assets/images.jpg";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showUserIcons, setShowUserIcons] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowUserIcons(true);
      }, 2000);
    } else {
      setShowUserIcons(false);
    }
  }, [user]);

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const confirmLogout = () => {
    setShowModal(false);
    dispatch(logout());
    setShowUserIcons(false);
    navigate("/");
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <nav className='flex items-center justify-between bg-gray-800 p-4 text-white'>
        <Link to='/' className='flex items-center'>
          <img src={images} alt='Intellipaat' className='rounded-full w-10' />
        </Link>
        <div className='flex items-center'>
          {showUserIcons && (
            <>
              <Link to='/profile' className='mx-2 flex items-center'>
                <FaUserCircle className='mr-2' />
                Profile
              </Link>
              {user && user.isAdmin && (
                <Link to='/dashboard' className='mx-2 flex items-center'>
                  <FaTachometerAlt className='mr-2' />
                  Dashboard
                </Link>
              )}
              <Link to='/create-post' className='mx-2 flex items-center'>
                <FaEdit className='mr-2' />
                Create Post
              </Link>
              <button
                onClick={handleLogoutClick}
                className='mx-2 flex items-center'
              >
                <FaSignOutAlt className='mr-2' />
                Logout
              </button>
            </>
          )}
          {!user && (
            <>
              <Link to='/login' className='mx-2 flex items-center'>
                <FaSignInAlt className='mr-2' />
                Login
              </Link>
              <Link to='/register' className='mx-2 flex items-center'>
                <FaUserPlus className='mr-2' />
                SignUp
              </Link>
            </>
          )}
          <Link to='/' className='mx-2 flex items-center'>
            <FaHome className='mr-2' />
            Home
          </Link>
        </div>
      </nav>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className='text-center'>
          <h2 className='text-lg font-bold'>Confirm Logout</h2>
          <p className='mt-4'>Are you sure you want to logout?</p>
          <div className='mt-6 flex justify-center gap-4'>
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              onClick={confirmLogout}
            >
              Logout
            </button>
            <button
              className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Navbar;
