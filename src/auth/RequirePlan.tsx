import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const RequirePlan: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { hasActivePlan } = useAuth();

  // Wait for the dashboard membership request before choosing a destination.
  if (hasActivePlan === null) return null;
  return hasActivePlan ? children : <Navigate to="/pricing/" replace />;
};
