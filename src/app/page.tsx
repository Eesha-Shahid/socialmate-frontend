'use client'
import React, { useEffect } from 'react';
import UnauthLayout from '@/components/layouts/unauthLayout';
import { loadUser } from '@/redux/actions/authAction';
import store from '@/redux/store';
import { useSelector } from 'react-redux';
import { AuthSelector } from '@/redux/reducers/authReducer';
import { Spin } from 'antd';
import { Alert, AuthLayout } from '@/components';

interface HomeProps {
  children: React.ReactNode; 
}

const Home: React.FC<HomeProps> = ({ children }) => {

  const { isAuthenticated, loading } = useSelector(AuthSelector);
  
  useEffect(() => {
    if (isAuthenticated) store.dispatch(loadUser());
  }, []);

  return(
    <>
      <Alert/>
      { loading ? (
        <Spin size='large'/>
      ) : isAuthenticated ? (
        <AuthLayout>
          {children}
        </AuthLayout>
      ) : (
        <UnauthLayout>
          {children}
        </UnauthLayout>
      )}
    </>
  );
};

export default Home;