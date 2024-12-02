import React from "react";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import AuthLayout from "../layouts/AuthLayout";
import PersonalDetails from "../features/auth/register/PersonalDetailPage";
import Verification from "../features/auth/register/Verification";
import ProfessionalDetails from "../features/auth/register/ProfessionalDetails";
import Dashboard from "../pages/DashboardPages/Dashboard";
import Login from "../features/auth/login/Login";

export const RegisterRoutes = [
  {
    path: "/",
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
