import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../templates/RootLayout';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import TripsListPage from '../pages/Trips/TripsListPage';
import TripDetailPage from '../pages/Trips/TripDetailPage';
import AddExpensePage from '../pages/Expenses/AddExpensePage';
import TripSetupPage from '../pages/Trips/TripSetupPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

// Configure app routes with everything public (no auth)
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'trips', element: <TripsListPage /> },
      { path: 'trips/:tripId', element: <TripDetailPage /> },
      { path: 'expenses/add', element: <AddExpensePage /> },
      { path: 'trip-setup', element: <TripSetupPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);

// PUBLIC_INTERFACE
export default function AppRouter() {
  /** RouterProvider that renders the route tree for the app. */
  return <RouterProvider router={router} />;
}
