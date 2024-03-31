'use client'
import React from 'react';
import { AuthLayout } from '@/components';
import UnauthLayout from '@/components/layouts/unauthLayout';

interface HomeProps {
  children: React.ReactNode; 
}

const Home: React.FC<HomeProps> = ({ children }) => {
  return(
    // <AuthLayout>
    //   {children}
    // </AuthLayout>
    <UnauthLayout>
      {children}
    </UnauthLayout>
  );
};

export default Home;