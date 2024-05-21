'use client'
import React from 'react';
import UnauthLayout from '@/components/layouts/unauthLayout';
import UnauthForm from '@/components/layouts/unauthLayout/unauthForm';

const UnauthPage: React.FC = () => {
  return (
    <UnauthLayout>
      <UnauthForm />
    </UnauthLayout>
  );
};

export default UnauthPage;
