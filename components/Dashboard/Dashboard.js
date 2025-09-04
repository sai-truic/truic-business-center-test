import React from 'react';
import DashboardTop from './DashboardTop';
import DashboardBottom from './DashboardBottom';
import { useSafeUser } from '../useSafeUser';

// Main Dashboard component
const Dashboard = ({ handleButtonClick, handleSelectChange, onNavigate }) => {
  const { user } = useSafeUser();

  const isNewUser = user && user.createdAt === user.updatedAt;

  return (
    <div data-testid="dashboard" className="bg-white min-h-screen p-2 sm:p-4 md:p-6 lg:p-8">
      {isNewUser && (
        <Onboarding 
          handleButtonClick={handleButtonClick} 
          handleSelectChange={handleSelectChange} 
          isTriggeredFromDashboard={true}
        />
      )}
      <DashboardTop handleButtonClick={handleButtonClick} />
      <div className=''>
        <DashboardBottom handleButtonClick={handleButtonClick} onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default Dashboard;
