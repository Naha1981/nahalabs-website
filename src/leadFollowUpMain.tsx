import React from 'react';
import { createRoot } from 'react-dom/client';
import { LeadFollowUpAutomationPage } from './components/LeadFollowUpAutomationPage';
import './index.css';

createRoot(document.getElementById('lead-follow-up-root')!).render(
  <React.StrictMode>
    <LeadFollowUpAutomationPage />
  </React.StrictMode>,
);
