import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Connect() {
  const [accountId, setAccountId] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleConnect = () => {
    // Simulating connection process
    alert('Connecting to cloud account...');
    // In a real application, you would send this data to your backend
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
            <div className="space-y-4">
              <div>
                <Label htmlFor="accountId">Account ID</Label>
                <Input
                  id="accountId"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                  placeholder="Enter your cloud account ID"
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
                />
              </div>
              <Button onClick={handleConnect}>Connect Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}