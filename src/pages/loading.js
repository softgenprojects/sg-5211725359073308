import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    // Simulate loading process
    const timer = setTimeout(() => {
      router.push('/post-connection');
    }, 5000); // Redirect after 5 seconds

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Layout>
      <div className="container mx-auto p-6 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center p-6">
            <div className="w-32 h-32 mb-4">
              {/* Replace with your animated SVG or use a library like Lottie for animations */}
              <img src="/api/placeholder/128/128" alt="Loading animation" className="animate-spin" />
            </div>
            <p className="text-lg font-semibold mb-2">Connecting Your Account</p>
            <p className="text-center text-muted-foreground">
              We're wringing out savings from your cloud spend. This may take a few moments...
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}