import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export const LogoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    logout();
    navigate('/login/', { replace: true });
  }, [logout, navigate]);

  return null;
};
