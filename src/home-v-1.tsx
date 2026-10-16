import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Courses } from './components/Courses';
import { Features } from './components/Features';
import { TutorsLiveHub } from './components/TutorsLiveHub';
import { PathTimeline } from './components/PathTimeline';
import { Showcase } from './components/Showcase';
import { Footer } from './components/Footer';

export default function HomeV1() {
  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar onNavigate={scrollToSection} />
      <main>
        <Hero />
        <Courses />
        <Features />
        <TutorsLiveHub />
        <PathTimeline />
        <Showcase />
      </main>
      <Footer />
    </div>
  );
}