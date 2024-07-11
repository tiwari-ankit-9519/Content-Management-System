import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../redux/authSlice";
import { toast } from "react-toastify";
import LoadingScreen from "../components/LoadingScreen";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.auth);

  useEffect(() => {
    if (status === "succeeded" && user) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        if (user.isAdmin) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
        toast.success("Login successful");
      }, 2000);
    } else if (status === "failed") {
      toast.error("Login failed. Please check your credentials and try again.");
    }
  }, [user, status, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className='flex justify-center items-center h-screen bg-gray-100'>
      <div className='w-full max-w-xs'>
        <form
          onSubmit={handleSubmit}
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        >
          <h3 className='text-2xl font-bold mb-4  text-center text-gray-700 '>
            Hello There!
          </h3>
          <div className='mb-4'>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='name@email.com'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-6'>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='••••••••'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              type='submit'
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full'
            >
              Login
            </button>
          </div>
          <div className='mt-4 text-center'>
            <p className='text-sm'>
              You are not a member?{" "}
              <Link
                to='/register'
                className='text-blue-500 hover:text-blue-700'
              >
                Register
              </Link>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
