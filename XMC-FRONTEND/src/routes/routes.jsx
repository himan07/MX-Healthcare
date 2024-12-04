import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import PersonalDetails from "../features/auth/register/PersonalDetailPage";
import Verification from "../features/auth/register/Verification";
import ProfessionalDetails from "../features/auth/register/ProfessionalDetails";
import Dashboard from "../pages/DashboardPages/Dashboard";
import Login from "../features/auth/login/Login";
import LandingPage from "../pages/landingPage/LandingPage";
import PublicRoute from "../routes/PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

export const RegisterRoutes = [
  {
    path: "/",
    element: (
      <PublicRoute>
        <LandingPage />
      </PublicRoute>
    ),
  },
  {
    path: "/register/personal-details",
    element: (
      <PublicRoute>
        <AuthLayout>
          <PersonalDetails />
        </AuthLayout>
      </PublicRoute>
    ),
  },
  {
    path: "/register/verification",
    element: (
      <PublicRoute>
        <AuthLayout>
          <Verification />
        </AuthLayout>
      </PublicRoute>
    ),
  },
  {
    path: "/register/professional-details",
    element: (
      <PublicRoute>
        <AuthLayout>
          <ProfessionalDetails />
        </AuthLayout>
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
];

export const AuthRoutes = [
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
];
