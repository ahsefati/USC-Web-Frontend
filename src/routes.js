import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';

// Blog
import BlogPage from './pages/BlogPage';

// Auth
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPassPage from './pages/ForgotPassPage';

// Main Pages
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SavedDocuments from './pages/SavedDocuments';
import SavedTools from './pages/SavedTools';
import KoochStats from './pages/KoochStats';
import UserRanking from './pages/UserRanking';
import UserProfilePage from './pages/UserProfilePage';

// Tools
import UniversitySearchPage from './pages/Tools/UniversitySearchPage';
import CountryCitySearchPage from './pages/Tools/CountryCitySearchPage';
import CostEstimationPage from './pages/Tools/CostEstimationPage';
import JobsAndFieldsPage from './pages/Tools/JobsAndFieldsPage';
import CVCreatorPage from './pages/Tools/CVCreatorPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'saveddocuments', element: <SavedDocuments /> },
        { path: 'savedtools', element: <SavedTools /> },
        { path: 'koochstats', element: <KoochStats /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'usersranking', element: <UserRanking /> },
        { path: 'userprofile', element: <UserProfilePage /> },
        { path: 'universities', element: <UniversitySearchPage /> },
        { path: 'countrycity', element: <CountryCitySearchPage /> },
        { path: 'costestimation', element: <CostEstimationPage /> },
        { path: 'jobsandfields', element: <JobsAndFieldsPage /> },
        { path: 'cvcreator', element: <CVCreatorPage /> },
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
        { element: <Navigate to="/dashboard/app" />, index: true },
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
