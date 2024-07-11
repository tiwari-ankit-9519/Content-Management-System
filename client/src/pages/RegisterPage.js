import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../redux/authSlice";
import { toast } from "react-toastify";
import {
  FaUserAlt,
  FaEnvelope,
  FaPhone,
  FaTransgender,
  FaBirthdayCake,
  FaAddressCard,
  FaImage,
  FaLock,
} from "react-icons/fa";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    address: "",
    phoneNumber: "",
    password: "",
  });
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(register({ userData, imageFile: image })).unwrap();
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded shadow-md space-y-4 w-full max-w-lg'
      >
        <h2 className='text-2xl font-bold mb-10 text-gray-900 text-center'>
          Register
        </h2>
        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-1 flex items-center border-2 border-gray-300 p-2 rounded-md'>
            <FaUserAlt className='mr-2' />
            <input
              type='text'
              id='firstName'
              name='firstName'
              placeholder='First Name'
              onChange={handleChange}
              value={userData.firstName}
              required
              className='w-full outline-none'
            />
          </div>
          <div className='col-span-1 flex items-center border-2 border-gray-300 p-2 rounded-md'>
            <FaUserAlt className='mr-2' />
            <input
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Last Name'
              onChange={handleChange}
              value={userData.lastName}
              required
              className='w-full outline-none'
            />
          </div>
          <div className='col-span-1 flex items-center border-2 border-gray-300 p-2 rounded-md'>
            <FaBirthdayCake className='mr-2' />
            <input
              type='date'
              id='dob'
              name='dob'
              onChange={handleChange}
              value={userData.dob}
              required
              className='w-full outline-none'
            />
          </div>
          <div className='col-span-1 flex items-center border-2 border-gray-300 p-2 rounded-md'>
            <FaTransgender className='mr-2' />
            <select
              id='gender'
              name='gender'
              onChange={handleChange}
              value={userData.gender}
              required
              className='w-full outline-none'
            >
              <option value=''>Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>
          <div className='col-span-1 flex items-center border-2 border-gray-300 p-2 rounded-md'>
            <FaPhone className='mr-2' />
            <input
              type='text'
              id='phoneNumber'
              name='phoneNumber'
              placeholder='Phone Number'
              onChange={handleChange}
              value={userData.phoneNumber}
              required
              className='w-full outline-none'
            />
          </div>
          <div className='col-span-1 flex items-center border-2 border-gray-300 p-2 rounded-md'>
            <FaEnvelope className='mr-2' />
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Email'
              onChange={handleChange}
              value={userData.email}
              required
              className='w-full outline-none'
            />
          </div>
          <div className='col-span-2 flex items-center border-2 border-gray-300 p-2 rounded-md'>
            <FaAddressCard className='mr-2' />
            <input
              type='text'
              id='address'
              name='address'
              placeholder='Address'
              onChange={handleChange}
              value={userData.address}
              required
              className='w-full outline-none'
            />
          </div>
          <div className='col-span-2 flex items-center border-2 border-gray-300 p-2 rounded-md'>
            <FaLock className='mr-2' />
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
              value={userData.password}
              required
              className='w-full outline-none'
            />
          </div>
          <div className='col-span-2 flex items-center border-2 border-gray-300 p-2 rounded-md'>
            <FaImage className='mr-2' />
            <input
              type='file'
              id='image'
              onChange={handleImageChange}
              className='w-full outline-none'
            />
          </div>
        </div>
        <button
          type='submit'
          className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
