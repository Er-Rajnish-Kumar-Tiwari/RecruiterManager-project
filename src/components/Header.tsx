import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";

// TabButton component
interface TabButtonProps {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ name, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200 ${
        isActive
          ? 'border-teal-600 text-teal-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      {name}
    </button>
  );
};

// Header component
const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get current path

  const tabs = [
    { name: 'Dashboard', route: '/' },
    { name: 'Clients', route: '/client-management' },
    { name: 'Positions', route: '/position-management' },
    { name: 'Candidates', route: '/candidate-management' },
    { name: 'Submissions', route: '/submission-management' },
    { name: 'Offers', route: '/offer-management' },
    { name: 'AI Resume Matcher', route: '/ai-matcher' },
    { name: 'Whatsapp', route: '/whatsapp-tab' },
  ];

  const handleTabClick = (tab: { name: string; route?: string }) => {
    if (tab.route) {
      navigate(tab.route);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-teal-600 rounded text-white flex items-center justify-center font-bold text-sm">
              HR
            </div>
            <span className="text-lg font-semibold text-gray-800">HR Dashboard</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
            JS
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-8 px-6">
        {tabs.map((tab) => (
          <TabButton
            key={tab.name}
            name={tab.name}
            isActive={location.pathname === tab.route}
            onClick={() => handleTabClick(tab)}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
