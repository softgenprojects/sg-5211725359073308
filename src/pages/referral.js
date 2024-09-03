import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';

export default function Referral() {
  const [email, setEmail] = useState('');
  const [rewardChoice, setRewardChoice] = useState('credits');

  const handleInvite = (e) => {
    e.preventDefault();
    // Simulating invite process
    toast({
      title: "Invitation Sent!",
      description: `An invitation has been sent to ${email}.`,
    });
    setEmail('');
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Referral Program</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Invite your friends and colleagues to Wring.co and earn rewards when they start saving!</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Invite via Email</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvite} className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="friend@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit">Invite</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Invite via Link</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Share this unique link with your network:</p>
            <Input value="https://wring.co/ref/yourUniqueCode" readOnly />
            <Button className="mt-2">Copy Link</Button>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Saving Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>$1,000 in savings: Receive a branded mug or 1K credits</li>
              <li>$10,000 in savings: Earn a billboard ad in Times Square</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payout Options</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={rewardChoice} onValueChange={setRewardChoice}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credits" id="credits" />
                <Label htmlFor="credits">Wring.co Credits</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Cash Payout</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}