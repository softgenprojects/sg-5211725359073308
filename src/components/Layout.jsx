import Head from 'next/head';
import Link from 'next/link';
import { Toaster } from '@/components/ui/toaster';
import Notification from '@/components/Notification';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Wring.co - Cloud Cost Optimization</title>
        <meta name="description" content="Optimize your cloud spend with Wring.co" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">Wring.co</Link>
          <div className="space-x-4">
            <Link href="/" className="hover:underline">Dashboard</Link>
            <Link href="/settings" className="hover:underline">Settings</Link>
            <Link href="/referral" className="hover:underline">Referral</Link>
            <Link href="/founders-hub" className="hover:underline">Founder's Hub</Link>
          </div>
        </div>
      </nav>
      <main className="min-h-screen bg-background">
        {children}
      </main>
      <Notification />
      <Toaster />
    </>
  );
}