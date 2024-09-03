import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';

export default function Home({ user, cloudSpendTrends }) {
  return (
    <Layout>
      <Dashboard user={user} cloudSpendTrends={cloudSpendTrends} />
    </Layout>
  );
}

export async function getServerSideProps() {
  // Fetch user data
  const userRes = await fetch('http://localhost:3000/api/user');
  const user = await userRes.json();

  // Fetch cloud spend trends
  const trendsRes = await fetch('http://localhost:3000/api/cloudSpendTrends');
  const cloudSpendTrends = await trendsRes.json();

  return {
    props: {
      user,
      cloudSpendTrends,
    },
  };
}