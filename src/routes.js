import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

// Auth
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPassPage from './pages/ForgotPassPage';

// Main Pages
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import GeneralAnalysisPage from './pages/GeneralAnalysisPage';
import UserProfilePage from './pages/UserProfilePage';

// Tools
import CoinDetailsPage from './pages/Tools/CoinDetailsPage';
import GeneralInfoPage from './pages/GeneralAnalysisPages/GeneralInfoPage';
import GenerateHistogramPage from './pages/GeneralAnalysisPages/GenerateHistogramPage';
import HomePage from './pages/HomePage';
import UploadDatasetPage from './pages/UploadDatasetPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'home', element: <HomePage /> },
        { element: <Navigate to="/dashboard/home" />, index: true },
        { 
          path: 'generalanalysis', 
          element: <GeneralAnalysisPage />,
        },
        {path: 'generalanalysis/generalinfo', element: <GeneralInfoPage/>},
        {path: 'generalanalysis/generatehistogram', element: <GenerateHistogramPage/>},
        { path: 'dbquery', element: <DashboardAppPage /> },
        { 
          path: 'dbupload', 
          element: <UploadDatasetPage />,
        },
        { path: 'userprofile', element: <UserProfilePage /> },
        { path: 'coindetails/:id', element: <CoinDetailsPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'signup',
      element: <SignupPage/>,
    },
    {
      path: 'forgotpass',
      element: <ForgotPassPage/>,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/home" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
