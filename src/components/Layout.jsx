import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Toaster } from '@/components/ui/toaster';
import Notification from '@/components/Notification';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Layout({ children }) {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

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
            {[
              { href: '/', label: 'Dashboard' },
              { href: '/settings', label: 'Settings' },
              { href: '/referral', label: 'Referral' },
              { href: '/founders-hub', label: "Founder's Hub" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`hover:underline ${isActive(href) ? 'font-bold' : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <ErrorBoundary>
        <main className="min-h-screen bg-background">
          {children}
        </main>
      </ErrorBoundary>
      <Notification />
      <Toaster />
    </>
  );
}