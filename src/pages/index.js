import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import { useState, useEffect } from 'react';

export default function Home() {
  const [user, setUser] = useState(null);
  const [cloudSpendTrends, setCloudSpendTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, trendsRes] = await Promise.all([
          fetch('/api/user'),
          fetch('/api/cloudSpendTrends')
        ]);

        if (!userRes.ok || !trendsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const userData = await userRes.json();
        const trendsData = await trendsRes.json();

        setUser(userData);
        setCloudSpendTrends(trendsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <Layout><div className="container mx-auto p-6">Loading...</div></Layout>;
  }

  if (error) {
    return <Layout><div className="container mx-auto p-6">Error: {error}</div></Layout>;
  }

  return (
    <Layout>
      <Dashboard user={user} cloudSpendTrends={cloudSpendTrends} />
    </Layout>
  );
}