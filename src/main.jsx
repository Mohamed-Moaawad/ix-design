import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// Pages 
import Register from './pages/register/Register';
import SignUp from './components/forms/signUp/SignUp';
import SignIn from './components/forms/signIn/SignIn';
import ForgotPassword from './components/forms/signIn/forgotPassword/ForgotPassword';
import Home from './pages/home/Home';
import AddPost from './pages/addPost/AddPost';
import PostPage from './pages/postPage/PostPage';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/editProfile/EditProfile';
import UserProfile from './pages/userProile/UserProfile';
import NotFoundPage from './pages/notFoundPage/NotFoundPage';



const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
    children:[
      {
        path: 'signin',
        element: <SignIn />
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />
      }
    ]
  },
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/add-post',
    element: <AddPost />
  },
  {
    path: '/post/:id',
    element: <PostPage />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/edit-profile',
    element: <EditProfile />
  },
  {
    path: '/user-profile/:id',
    element: <UserProfile />
  },
  
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode> 
    <RouterProvider router={router} />
  </React.StrictMode>,
)
