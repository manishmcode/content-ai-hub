import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { LibraryPage } from './pages/LibraryPage';
import { PricingPage } from './pages/PricingPage';
import { UnsubscribePage } from './pages/UnsubscribePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { MyAccountPage } from './pages/MyAccountPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ImprintPage } from './pages/ImprintPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LogoutPage } from './pages/LogoutPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { RequireAuth } from './auth/RequireAuth';
import { RequirePlan } from './auth/RequirePlan';
import { CanonicalUrl } from './components/CanonicalUrl';
import { PageMetadata } from './components/PageMetadata';

const ScrollToHash: React.FC = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      if (pathname !== '/') window.scrollTo({ top: 0 });
      return;
    }

    const target = document.getElementById(hash.slice(1));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash, pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CanonicalUrl />
      <PageMetadata />
      <ScrollToHash />
      <Routes>
        {/* Core Pages from Reference Site */}
        <Route path="/" element={<HomePage />} />
        <Route path="/library/" element={<RequireAuth><RequirePlan><LibraryPage /></RequirePlan></RequireAuth>} />
        <Route path="/pricing/" element={<PricingPage />} />
        <Route path="/unsubscribe/" element={<UnsubscribePage />} />
        <Route path="/login/" element={<LoginPage />} />
        <Route path="/logout/" element={<LogoutPage />} />
        <Route path="/signup/" element={<SignupPage />} />
        <Route path="/my-account/" element={<RequireAuth><MyAccountPage /></RequireAuth>} />
        
        {/* Legal Pages */}
        <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
        <Route path="/terms-conditions/" element={<TermsPage />} />
        <Route path="/imprint/" element={<ImprintPage />} />

        {/* Compatibility Aliases mapping directly to reference site destinations */}
        <Route path="/account/" element={<Navigate to="/my-account/" replace />} />
        <Route path="/dashboard/" element={<Navigate to="/library/" replace />} />
        <Route path="/my-courses/" element={<Navigate to="/library/" replace />} />
        <Route path="/live-classes/" element={<Navigate to="/library/" replace />} />
        <Route path="/courses/" element={<Navigate to="/library/" replace />} />
        <Route path="/courses/:slug/" element={<Navigate to="/library/" replace />} />
        <Route path="/checkout/" element={<CheckoutPage />} />
        <Route path="/terms/" element={<Navigate to="/terms-conditions/" replace />} />
        <Route path="/privacy/" element={<Navigate to="/privacy-policy/" replace />} />

        {/* 404 Catch-All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
