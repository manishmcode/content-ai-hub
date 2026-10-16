import React from 'react';
import { Hero } from '../components/Hero';
import { Courses } from '../components/Courses';
import { Features } from '../components/Features';
import { PathTimeline } from '../components/PathTimeline';
import { Showcase } from '../components/Showcase';
import { PublicLayout } from '../components/layout/PublicLayout';

export const HomePage: React.FC = () => {
  return (
    <PublicLayout>
      <Hero />
      <Courses />
      <Features />
      <PathTimeline />
      <Showcase />
    </PublicLayout>
  );
};
