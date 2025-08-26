import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from '../templates/RootLayout';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import TripsListPage from '../pages/Trips/TripsListPage';
import TripDetailPage from '../pages/Trips/TripDetailPage';
import AddExpensePage from '../pages/Expenses/AddExpensePage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';
import LoginPage from '../pages/Auth/LoginPage';
import SignupPage from '../pages/Auth/SignupPage';
import RequireAuth from '../routes/route-guards/RequireAuth';

// Configure app routes with public and protected sections
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <RootLayout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'trips', element: <TripsListPage /> },
      { path: 'trips/:tripId', element: <TripDetailPage /> },
      { path: 'expenses/add', element: <AddExpensePage /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '*', element: <NotFoundPage /> },
]);

// PUBLIC_INTERFACE
export default function AppRouter() {
  /** RouterProvider that renders the route tree for the app. */
  return <RouterProvider router={router} />;
}
