import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Toaster } from '@/components/ui/toaster';
import Notification from '@/components/Notification';
import ErrorBoundary from '@/components/ErrorBoundary';
import { LayoutDashboard, Settings, Users, HelpCircle, Menu } from 'lucide-react';

export default function Layout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) => router.pathname === path;

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/referral', label: 'Referral', icon: Users },
    { href: 'https://notion.so/', label: 'Help', icon: HelpCircle, external: true },
  ];

  return (
    <>
      <Head>
        <title>Wring.co - Cloud Cost Optimization</title>
        <meta name="description" content="Optimize your cloud spend with Wring.co" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-screen bg-background">
        {/* Sidebar */}
        <aside className={`bg-primary text-primary-foreground w-64 min-h-screen p-4 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <div className="flex justify-between items-center mb-6">
            <Link href="/" className="text-xl font-bold">Wring.co</Link>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden">
              <Menu size={24} />
            </button>
          </div>
          <nav>
            {menuItems.map(({ href, label, icon: Icon, external }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-2 p-2 rounded hover:bg-primary-foreground hover:text-primary mb-2 ${
                  isActive(href) ? 'bg-primary-foreground text-primary' : ''
                }`}
                target={external ? "_blank" : "_self"}
                rel={external ? "noopener noreferrer" : ""}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-primary text-primary-foreground p-4 md:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
          </header>
          <ErrorBoundary>
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-6">
              {children}
            </main>
          </ErrorBoundary>
        </div>
      </div>
      <Notification />
      <Toaster />
    </>
  );
}