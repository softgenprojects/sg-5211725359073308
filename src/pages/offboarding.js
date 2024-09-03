import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Offboarding() {
  const [reason, setReason] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement offboarding logic here
    console.log('Offboarding reason:', reason);
    // After successful offboarding, redirect to a farewell page or home
    router.push('/');
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">We're Sad to See You Go</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Offboarding</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              {`<User Name>, we are sad to see you go. Before you leave, please consider the following:`}
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2">
              <li>You will lose out on $X of future savings.</li>
              <li>You will have to pay X% more per month.</li>
              <li>You won't have access to your past $X savings.</li>
            </ul>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="reason">Please tell us why you're leaving:</Label>
                <Input
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Your reason for leaving"
                  required
                />
              </div>
              <Button type="submit" variant="destructive">Confirm Account Deletion</Button>
            </form>
          </CardContent>
        </Card>

        <Button variant="outline" onClick={() => router.push('/dashboard')}>
          I've Changed My Mind
        </Button>
      </div>
    </Layout>
  );
}