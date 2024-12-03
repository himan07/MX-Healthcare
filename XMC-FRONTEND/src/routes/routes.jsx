import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import AuthLayout from "../layouts/AuthLayout";
import PersonalDetails from "../features/auth/register/PersonalDetailPage";
import Verification from "../features/auth/register/Verification";
import ProfessionalDetails from "../features/auth/register/ProfessionalDetails";
import Dashboard from "../pages/DashboardPages/Dashboard";
import Login from "../features/auth/login/Login";
import LandingPage from "../pages/landingPage/LandingPage";

export const RegisterRoutes = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/register/personal-details",
    element: (
      <AuthLayout>
        <PersonalDetails />
      </AuthLayout>
    ),
  },
  {
    path: "/register/verification",
    element: (
      <AuthLayout>
        <Verification />
      </AuthLayout>
    ),
  },
  {
    path: "/register/professional-details",
    element: (
      <AuthLayout>
        <ProfessionalDetails />
      </AuthLayout>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export const AuthRoutes = [
  {
    path: "/dashboard/*",
    element: (
      <>
        <SignedIn>
          <Dashboard />
        </SignedIn>
        <SignedOut>
          <Login />
        </SignedOut>
      </>
    ),
  },
];
