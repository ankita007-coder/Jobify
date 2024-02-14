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
  EditJob,
} from './pages'; // Import page components

import { action as registerAction } from './pages/Register'; // Import register action
import { action as loginAction } from './pages/Login'; // Import login action
import { loader as dashboardLoader } from './pages/DashboardLayout';
import { action as addJobAction} from './pages/AddJob';
import { loader as allJobsLoader } from './pages/AllJobs';
import { action as editJobAction } from './pages/EditJob';
import { loader as editJobLoader } from './pages/EditJob';
import { action as deleteJobAction} from './pages/DeleteJob';
import { loader as adminLoader} from './pages/Admin';
import { action as profileAction } from './pages/Profile';
import { loader as statsLoader } from './pages/Stats';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorElement from './components/ErrorElement';


// Function to check and apply default theme preference
export const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem('dark-theme') === 'true';
  document.body.classList.toggle('dark-theme', isDarkTheme); // Apply dark theme class if preference is set
  return isDarkTheme;
};

checkDefaultTheme(); // Call the function to set theme initially

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 1000*60*3
    }
  }
})
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
        action: loginAction(queryClient), // Associate login action with this route
      },
      {
        path: 'dashboard', // Route for dashboard
        element: <DashboardLayout 
                  queryClient={queryClient}/>, // Render DashboardLayout component
        loader: dashboardLoader(queryClient),
        children: [
          {
            index: true, // Default child route for dashboard
            element: <AddJob />, // Render AddJob 
            action:addJobAction(queryClient)
          },
          {
            path: 'stats', // Route for statistics
            element: <Stats />, // Render Stats component
            loader: statsLoader(queryClient),
            errorElement: <ErrorElement/>
          },
          {
            path: 'all-jobs', // Route for all jobs
            element: <AllJobs />, // Render AllJobs component
            loader: allJobsLoader(queryClient),
            errorElement: <ErrorElement/>
          },
          {
            path: 'profile', // Route for user profile
            element: <Profile />, // Render Profile component
            action: profileAction(queryClient)
          },
          {
            path: 'admin', // Route for admin area
            element: <Admin />, // Render Admin component
            loader:adminLoader
          },
          {
            path: 'edit-job/:id',
            element: <EditJob/>,
            loader: editJobLoader(queryClient),
            action: editJobAction(queryClient)
          },{
            path:'delete-job/:id',
            action: deleteJobAction(queryClient)
          }
        ],
      },
    ],
  },
]);

// App component, providing the router context
const App = () => {
  return <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false}/>
          </QueryClientProvider>
};

export default App;
