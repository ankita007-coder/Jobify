import React from 'react';
import "./index.css"; // Import custom CSS styles
import { RouterProvider, createBrowserRouter } from "react-router-dom"; // Import React Router components
import {
  DashboardLayout,
  Error,
  HomeLayout,
  Landing,
  Login,
  Register,
  AllJobs,
  Stats,
  AddJob,
  Profile,
  Admin,
} from './pages'; // Import page components

import { action as registerAction } from './pages/Register'; // Import register action
import { action as loginAction } from './pages/Login'; // Import login action
import { loader as dashboardLoader } from './pages/DashboardLayout';

// Function to check and apply default theme preference
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('dark-theme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme); // Apply dark theme class if preference is set
  return isDarkTheme;
};

checkDefaultTheme(); // Call the function to set theme initially

// Create a router instance with defined routes
const router = createBrowserRouter([
  {
    path: '/', // Root path
    element: <HomeLayout />, // Render HomeLayout component
    errorElement: <Error />, // Render Error component for any errors
    children: [
      {
        index: true, // Default child route
        element: <Landing />, // Render Landing component
      },
      {
        path: 'register', // Route for registration
        element: <Register />, // Render Register component
        action: registerAction, // Associate register action with this route
      },
      {
        path: 'login', // Route for login
        element: <Login />, // Render Login component
        action: loginAction, // Associate login action with this route
      },
      {
        path: 'dashboard', // Route for dashboard
        element: <DashboardLayout />, // Render DashboardLayout component
        loader: dashboardLoader,
        children: [
          {
            index: true, // Default child route for dashboard
            element: <AddJob />, // Render AddJob component
          },
          {
            path: 'stats', // Route for statistics
            element: <Stats />, // Render Stats component
          },
          {
            path: 'all-jobs', // Route for all jobs
            element: <AllJobs />, // Render AllJobs component
          },
          {
            path: 'profile', // Route for user profile
            element: <Profile />, // Render Profile component
          },
          {
            path: 'admin', // Route for admin area
            element: <Admin />, // Render Admin component
          },
        ],
      },
    ],
  },
]);

// App component, providing the router context
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
