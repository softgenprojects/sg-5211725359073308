import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { Clipboard, Share2, DollarSign, Users } from 'lucide-react';
import PayoutModal from '@/components/PayoutModal';

export default function Referral() {
  const [email, setEmail] = useState('');
  const [referralStats, setReferralStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);

  useEffect(() => {
    const fetchReferralStats = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/referralStats');
        if (!res.ok) {
          throw new Error('Failed to fetch referral stats');
        }
        const data = await res.json();
        setReferralStats(data);
      } catch (error) {
        console.error('Error fetching referral stats:', error);
        toast({
          title: "Error",
          description: "Failed to load referral statistics. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReferralStats();
  }, []);

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/sendInvite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Failed to send invitation');
      toast({
        title: "Invitation Sent!",
        description: `An invitation has been sent to ${email}.`,
      });
      setEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://wring.co/ref/yourUniqueCode")
      .then(() => {
        toast({
          title: "Link Copied!",
          description: "Your referral link has been copied to the clipboard.",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Failed to copy link. Please try again.",
          variant: "destructive",
        });
      });
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent("https://wring.co/ref/yourUniqueCode");
    const title = encodeURIComponent("Join me on Wring.co and optimize your cloud costs!");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
  };

  const handleClaimMilestone = async (milestoneId) => {
    try {
      const res = await fetch('/api/claimMilestone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ milestoneId }),
      });
      if (!res.ok) throw new Error('Failed to claim milestone');
      toast({
        title: "Milestone Claimed!",
        description: "Your reward has been successfully claimed.",
      });
      // Refresh referral stats after claiming
      const updatedStats = await fetch('/api/referralStats').then(res => res.json());
      setReferralStats(updatedStats);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to claim milestone. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <Layout><div className="container mx-auto p-6">Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Referral Program</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Referral Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Users className="mr-2" />
                  <span>People Referred</span>
                </div>
                <span className="text-2xl font-bold">{referralStats.peopleReferred}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <DollarSign className="mr-2" />
                  <span>Total Earnings</span>
                </div>
                <span className="text-2xl font-bold">${referralStats.totalEarnings}</span>
              </div>
              <Button onClick={() => setIsPayoutModalOpen(true)}>PAYOUT</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Milestone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="mb-2">Progress to {referralStats.nextMilestone.name}</p>
                <Progress value={referralStats.nextMilestone.progress} className="w-full" />
              </div>
              <p>{referralStats.nextMilestone.description}</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Invite Friends</CardTitle>
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
            <CardTitle>Your Referral Link</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Input value="https://wring.co/ref/yourUniqueCode" readOnly />
              <Button onClick={handleCopyLink}><Clipboard className="mr-2" /> Copy</Button>
            </div>
            <Button onClick={handleShareLinkedIn}><Share2 className="mr-2" /> Share on LinkedIn</Button>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Saving Milestones</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {referralStats.milestones.map((milestone) => (
                <li key={milestone.id} className="flex items-center justify-between">
                  <div className="w-2/3">
                    <p className="font-semibold">{milestone.name}</p>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    <Progress value={milestone.progress} className="w-full mt-2" />
                  </div>
                  <Button
                    onClick={() => handleClaimMilestone(milestone.id)}
                    disabled={milestone.progress < 100 || milestone.claimed}
                  >
                    {milestone.claimed ? 'Claimed' : 'Claim'}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <PayoutModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        totalEarnings={referralStats.totalEarnings}
      />
    </Layout>
  );
}