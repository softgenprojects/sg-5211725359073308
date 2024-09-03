import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulating user data fetch
    setUser({ name: 'John Doe', savings: 5000 });
  }, []);

  return (
    <Layout>
      <Dashboard user={user} />
    </Layout>
  );
}