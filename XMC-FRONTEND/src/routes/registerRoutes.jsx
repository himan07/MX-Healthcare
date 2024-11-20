import React from "react";
import AuthLayout from "../layouts/AuthLayout";
import PersonalDetails from "../features/auth/register/PersonalDetailPage";
import Verification from "../features/auth/register/Verification";
import ProfessionalDetails from "../features/auth/register/ProfessionalDetails";

const registerRoutes = [
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
];

export default registerRoutes;
