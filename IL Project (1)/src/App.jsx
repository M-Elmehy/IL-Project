
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

import MainLayout from '@/layouts/MainLayout';

import HomePage from '@/pages/HomePage';
import JobsPage from '@/pages/JobsPage';
import JobDetailsPage from '@/pages/JobDetailsPage';
import ExpertsPage from '@/pages/ExpertsPage';
import ExpertProfilePage from '@/pages/ExpertProfilePage';
import SoftwarePage from '@/pages/SoftwarePage';
import SoftwareDetailsPage from '@/pages/SoftwareDetailsPage';
import HardwarePage from '@/pages/HardwarePage';
import HardwareDetailsPage from '@/pages/HardwareDetailsPage';
import DashboardPage from '@/pages/DashboardPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import PostJobPage from '@/pages/PostJobPage';
import OfferSoftwarePage from '@/pages/OfferSoftwarePage';
import OfferHardwarePage from '@/pages/OfferHardwarePage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="jobs/:id" element={<JobDetailsPage />} />
          <Route path="experts" element={<ExpertsPage />} />
          <Route path="experts/:id" element={<ExpertProfilePage />} />
          <Route path="software" element={<SoftwarePage />} />
          <Route path="software/:id" element={<SoftwareDetailsPage />} />
          <Route path="hardware" element={<HardwarePage />} />
          <Route path="hardware/:id" element={<HardwareDetailsPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="post-job" element={<PostJobPage />} />
          <Route path="offer-software" element={<OfferSoftwarePage />} />
          <Route path="offer-hardware" element={<OfferHardwarePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </motion.div>
  );
}

export default App;
