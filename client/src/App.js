import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import { sessionValidated } from "./redux/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import PostPreviewPage from "./pages/PostPreviewPage";
import CreatePost from "./pages/CreatePost";
import ProfilePage from "./pages/ProfilePage";
import Dashboard from "./pages/Dashboard";
import UserPC from "./pages/PostandComments";
import PostEdit from "./pages/PostEdit";

// Wrapper component to extract userId from route params
const UserPCWrapper = () => {
  const { userId } = useParams();
  return <UserPC userId={userId} />;
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionValidated());
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/post-preview/:postId' element={<PostPreviewPage />} />
        <Route path='/create-post' element={<CreatePost />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/user-profile/:userId' element={<UserPCWrapper />} />
        <Route path='/update-post/:postId' element={<PostEdit />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
