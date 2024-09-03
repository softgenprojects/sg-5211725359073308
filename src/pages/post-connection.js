import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Share2 } from 'lucide-react';

export default function PostConnection() {
  const handleShare = (platform) => {
    // Implement sharing logic here
    alert(`Sharing to ${platform}...`);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Connection Successful!</h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Share Your Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You've saved $500 so far! Share your success with others:</p>
            <div className="flex space-x-4">
              <Button onClick={() => handleShare('Twitter')} className="flex items-center">
                <Share2 className="mr-2" />
                Share on Twitter
              </Button>
              <Button onClick={() => handleShare('LinkedIn')} className="flex items-center">
                <Share2 className="mr-2" />
                Share on LinkedIn
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Explore your dashboard to see detailed savings information</li>
              <li>Set up notifications to stay informed about your cloud spend</li>
              <li>Invite team members to collaborate on cost optimization</li>
            </ul>
            <Button className="mt-4" onClick={() => window.location.href = '/dashboard'}>
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}