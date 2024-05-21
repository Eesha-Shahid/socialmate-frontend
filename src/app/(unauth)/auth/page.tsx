'use client'
import React, { useEffect } from 'react';
import UnauthLayout from '@/components/layouts/unauthLayout';
import UnauthForm from '@/components/layouts/unauthLayout/unauthForm';
import { useSelector } from 'react-redux';
import { AuthSelector } from '@/redux/reducers';
import { loadUser } from '@/redux/actions/authAction';
import store from '@/redux/store';
import { Alert, AuthLayout } from '@/components';


const UnauthPage: React.FC = () => {
  const { isAuthenticated, loading } = useSelector(AuthSelector);
  
  useEffect(() => {
    if (isAuthenticated) {
      store.dispatch(loadUser());
    }
  }, [isAuthenticated]);

  return (
    <>
    <Alert />
    { loading || !isAuthenticated ? (
        <UnauthLayout>
          <UnauthForm />
        </UnauthLayout>
      ) : (
        <AuthLayout/>
      )}
    </>
  );
};

export default UnauthPage;
