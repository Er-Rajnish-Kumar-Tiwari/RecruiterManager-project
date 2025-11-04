import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import CandidateManagement from './pages/CandidateManagement.tsx'
import SubmissionManagementSystem from './pages/SubmissionManagementSystem.tsx'
import PositionManagement from './pages/PositionManagement.tsx'
import ClientManagement from './pages/ClientManagement.tsx'
import WhatsAppMsgTab from './pages/WhatsAppMsgTab.tsx'
import AIResumeMatcher from './pages/AIResumeMatcher.tsx'
import OffersTab from './pages/OfferManagement.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<App />} />
        
        {/* Submission Management page with specific URL */}
        <Route path="/submission-management" element={<SubmissionManagementSystem />} />
        <Route path="/candidate-management" element={ <CandidateManagement />} />
        <Route path="/position-management" element={<PositionManagement />} />
        <Route path='/client-management' element={<ClientManagement />} />
        <Route path='/whatsapp-tab' element={<WhatsAppMsgTab />} />
        <Route path='/ai-matcher' element={<AIResumeMatcher/>} />
        <Route path='/offer-management' element={<OffersTab/>} />
      
        
        {/* You can add more routes */}
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        <Route path="/candidates" element={<div>Candidates Page</div>} />
        
        {/* 404 page */}
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)