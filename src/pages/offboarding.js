import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Offboarding() {
  const [reason, setReason] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleOffboard = () => {
    if (confirmed) {
      // Implement actual offboarding logic here
      alert('Account deleted. We're sad to see you go!');
    } else {
      alert('Please confirm that you want to delete your account.');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">We're Sad to See You Go</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Consequences of Leaving</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>You will lose out on $5,000 of future savings</li>
              <li>You will have to pay 20% more per month for your cloud services</li>
              <li>You won't have access to your past $10,000 savings data</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="reason">Reason for leaving (optional)</Label>
                <Input
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Tell us why you're leaving"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="confirm"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                />
                <Label htmlFor="confirm">I understand that this action is irreversible</Label>
              </div>
              <Button onClick={handleOffboard} variant="destructive">Delete My Account</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}