import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function PostConnection() {
  const [autoShare, setAutoShare] = useState(false);
  const router = useRouter();

  const handleContinue = () => {
    // Implement logic to save sharing preferences
    router.push('/dashboard');
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Account Connected Successfully!</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Share Your Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Congratulations! You've successfully connected your account. 
              Would you like to share your savings on social media?
            </p>
            <div className="flex items-center space-x-2 mb-4">
              <Switch
                id="auto-share"
                checked={autoShare}
                onCheckedChange={setAutoShare}
              />
              <Label htmlFor="auto-share">Automatically share savings on LinkedIn</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Sharing your savings can help you earn rewards and inspire others to optimize their cloud spend.
            </p>
          </CardContent>
        </Card>

        <Button onClick={handleContinue}>Continue to Dashboard</Button>
      </div>
    </Layout>
  );
}