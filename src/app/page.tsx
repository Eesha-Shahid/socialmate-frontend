'use client'
import React from 'react';
import { AuthLayout } from '@/components';

interface HomeProps {
  children: React.ReactNode; 
}

const Home: React.FC<HomeProps> = ({ children }) => {
  return(
    <AuthLayout>
      {children}
    </AuthLayout>
  );
};

export default Home;