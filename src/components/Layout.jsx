import Head from 'next/head';
import { Toaster } from '@/components/ui/toaster';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Wring.co - Cloud Cost Optimization</title>
        <meta name="description" content="Optimize your cloud spend with Wring.co" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-background">
        {children}
      </main>
      <Toaster />
    </>
  );
}