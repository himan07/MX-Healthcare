import React from 'react';
import { Route } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import PersonalDetails from '../features/auth/register/PersonalDetailPage';


const registerRoutes = [
  {
    path: '/',
    element: (
      <AuthLayout>
        <PersonalDetails />
      </AuthLayout>
    ),
  },
];

export default registerRoutes;
