import React from 'react';
import { Hero } from '../components/Hero';
import { Courses } from '../components/Courses';
import { Showcase } from '../components/Showcase';
import { PublicLayout } from '../components/layout/PublicLayout';

export const HomePage: React.FC = () => {
  return (
    <PublicLayout>
      <Hero />
      <Courses />
      <Showcase />
    </PublicLayout>
  );
};
