import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Connect() {
  const [accountId, setAccountId] = useState('');
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();

  const handleConnect = (e) => {
    e.preventDefault();
    // Implement connection logic here
    console.log('Connecting account:', accountId, apiKey);
    // After successful connection, redirect to loading screen
    router.push('/loading');
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Connect Your Cloud Account</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Cloud Account Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConnect} className="space-y-4">
              <div>
                <Label htmlFor="accountId">Account ID</Label>
                <Input
                  id="accountId"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  placeholder="Enter your cloud account ID"
                  required
                />
              </div>
              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  required
                />
              </div>
              <Button type="submit">Connect Account</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}