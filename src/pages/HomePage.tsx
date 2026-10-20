import React from 'react';
import { Hero } from '../components/Hero';
import { Courses } from '../components/Courses';
import { Features } from '../components/Features';
import { LiveClassesSection } from '../components/LiveClassesSection';
import { PathTimeline } from '../components/PathTimeline';
import { PublicLayout } from '../components/layout/PublicLayout';

export const HomePage: React.FC = () => {
  return (
    <PublicLayout>
      <Hero />
      <Courses />
      <Features />
      <LiveClassesSection />
      <PathTimeline />
    </PublicLayout>
  );
};