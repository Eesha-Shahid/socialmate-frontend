'use client'
import React, { useEffect } from 'react';
import { loadUser } from '@/redux/actions/authAction';
import store from '@/redux/store';
import { useSelector } from 'react-redux';
import { AuthSelector } from '@/redux/reducers/authReducer';
import { Spin } from 'antd';
import { Alert, AuthLayout } from '@/components';
import LandingPage from '@/components/LandingPage';

interface HomeProps {
  children: React.ReactNode; 
}

const Home: React.FC<HomeProps> = ({ children }) => {

  const { isAuthenticated, loading } = useSelector(AuthSelector);
  

  useEffect(() => {
    if (isAuthenticated) {
      store.dispatch(loadUser());
    }
  }, [isAuthenticated]);

  return(
    <>
    <Alert />
    {loading ? (
      <Spin />
    ) : isAuthenticated ? (
      <AuthLayout>
        {children}
      </AuthLayout>
    ) : (
      <LandingPage />
    )}
  </>
  );
};

export default Home;