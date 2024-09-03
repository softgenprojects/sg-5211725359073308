import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import { useUser } from '@/context/UserContext';

export default function Home() {
  const { user, loading } = useUser();
  const [cloudSpendTrends, setCloudSpendTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/cloudSpendTrends');
        if (!res.ok) {
          throw new Error('Failed to fetch cloud spend trends');
        }
        const data = await res.json();
        setCloudSpendTrends(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) {
      fetchData();
    }
  }, [loading]);

  if (loading || isLoading) {
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