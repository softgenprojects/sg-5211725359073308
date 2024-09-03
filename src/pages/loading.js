import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      router.push('/dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Layout>
      <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Connecting Your Account</h2>
              <p className="mb-4">Please wait while we set everything up for you...</p>
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}