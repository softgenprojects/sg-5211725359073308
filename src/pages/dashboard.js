import React from 'react';
import Layout from '../components/Layout';
import DashboardHeader from '../components/DashboardHeader';
import DashboardStats from '../components/DashboardStats';
import RecentActivity from '../components/RecentActivity';
import UpcomingPayments from '../components/UpcomingPayments';

const Dashboard = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <DashboardStats />
          <RecentActivity />
        </div>
        <div className="mt-8">
          <UpcomingPayments />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;