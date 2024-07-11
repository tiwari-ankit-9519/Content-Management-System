import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProfile, updateUserProfile } from "../redux/userSlice";
import { format } from "date-fns";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const dispatch = useDispatch();
  // Assume auth state includes a token to represent login status
  const { token } = useSelector((state) => state.auth);
  const { profile, status, error } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    gender: "",
    profileImage: null,
  });

  // Effect to fetch user profile if a token is present (user is logged in)
  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token]);

  // Effect to update formData when the profile changes or reset on logout
  useEffect(() => {
    if (profile && token) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        phoneNumber: profile.phoneNumber || "",
        address: profile.address || "",
        gender: profile.gender || "",
        profileImage: null, // Assuming handling of profile image update/view is done elsewhere
      });
    } else {
      // Reset formData if there's no logged-in user
      setFormData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: "",
        profileImage: null,
      });
    }
  }, [profile, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const formattedValue =
      name === "gender"
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;
    setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profileImage: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ ...formData }))
      .unwrap()
      .then(() => {
        toast.success("Profile updated successfully!");
        setEditMode(false);
      })
      .catch((dispatchedError) => {
        toast.error(`Error: ${dispatchedError.message || dispatchedError}`);
      });
  };

  if (status === "loading") return <div>Loading...</div>;
  if (error)
    return <div>Error: {error.message || "An unknown error occurred"}</div>;

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden'>
        <div className='sm:flex sm:items-center px-6 py-4'>
          <img
            className='block mx-auto sm:mx-0 sm:shrink-0 h-24 rounded-full'
            src={`http://localhost:5000/${profile?.imageUrl}`}
            alt='Profile'
          />
          <div className='mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left'>
            <p className='text-xl leading-tight'>{`${profile?.firstName} ${profile?.lastName}`}</p>
            <p className='text-sm leading-tight text-gray-600'>
              {profile?.title}
            </p>
            <div className='mt-4'>
              <button
                type='button'
                onClick={() => setEditMode(!editMode)}
                className='text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 px-4 py-1'
              >
                {editMode ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>
        <div className='border-t border-gray-100'></div>
        <div className='px-6 py-4'>
          <h3 className='text-xs leading-4 font-semibold uppercase tracking-wide text-gray-500'>
            Contact Information
          </h3>
          <ul className='mt-3 space-y-3'>
            <li className='flex items-center'>
              <i className='fas fa-envelope fa-fw mr-2 text-gray-400'></i>
              {profile?.email}
            </li>
            <li className='flex items-center'>
              <i className='fas fa-phone fa-fw mr-2 text-gray-400'></i>
              {profile?.phoneNumber}
            </li>
            <li className='flex items-center'>
              <i className='fas fa-map-marker-alt fa-fw mr-2 text-gray-400'></i>
              {profile?.address}
            </li>
          </ul>
        </div>
        <div className='px-6 py-4'>
          <h3 className='text-xs leading-4 font-semibold uppercase tracking-wide text-gray-500'>
            Other Details
          </h3>
          <div className='mt-3 space-y-3'>
            <div>
              <span className='text-gray-600 text-uppercase'>Gender:</span>
              {profile?.gender
                ? profile.gender.charAt(0).toUpperCase() +
                  profile.gender.slice(1).toLowerCase()
                : "N/A"}
            </div>
            <div>
              <span className='text-gray-600'>Date of Birth:</span>
              {profile?.dob
                ? format(new Date(profile.dob), "MMMM dd, yyyy")
                : "N/A"}
            </div>
          </div>
        </div>
        {editMode && (
          <div className='px-6 py-4'>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <InputField
                label='First Name'
                name='firstName'
                value={formData.firstName}
                onChange={handleChange}
              />
              <InputField
                label='Last Name'
                name='lastName'
                value={formData.lastName}
                onChange={handleChange}
              />
              <InputField
                label='Phone Number'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <InputField
                label='Address'
                name='address'
                value={formData.address}
                onChange={handleChange}
              />
              <InputField
                label='Gender'
                name='gender'
                value={formData.gender}
                onChange={handleChange}
              />
              <div>
                <label
                  htmlFor='profileImage'
                  className='text-sm font-medium text-gray-700'
                >
                  Profile Image
                </label>
                <input
                  type='file'
                  name='profileImage'
                  id='profileImage'
                  onChange={handleFileChange}
                  className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm'
                />
              </div>
              <button
                type='submit'
                className='w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700'
              >
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label htmlFor={name} className='text-sm font-medium text-gray-700'>
      {label}
    </label>
    <input
      type='text'
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2'
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </div>
);

export default ProfilePage;
