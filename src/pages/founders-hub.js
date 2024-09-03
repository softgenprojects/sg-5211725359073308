import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FoundersHub() {
  const [featureRequest, setFeatureRequest] = useState('');
  const [voteCount, setVoteCount] = useState(0);

  const handleFeatureRequest = (e) => {
    e.preventDefault();
    // Implement feature request submission logic here
    console.log('Feature request submitted:', featureRequest);
    setFeatureRequest('');
  };

  const handleVote = () => {
    setVoteCount(voteCount + 1);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Founder's Hub</h1>
        
        <Tabs defaultValue="feature-requests" className="mb-6">
          <TabsList>
            <TabsTrigger value="feature-requests">Feature Requests</TabsTrigger>
            <TabsTrigger value="slack-community">Slack Community</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="feature-requests">
            <Card>
              <CardHeader>
                <CardTitle>Feature Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFeatureRequest} className="space-y-4">
                  <div>
                    <Label htmlFor="feature-request">Suggest a New Feature</Label>
                    <Input
                      id="feature-request"
                      value={featureRequest}
                      onChange={(e) => setFeatureRequest(e.target.value)}
                      placeholder="Describe the feature you'd like to see"
                      required
                    />
                  </div>
                  <Button type="submit">Submit Feature Request</Button>
                </form>
                
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Top Requested Features</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <span>Integration with AWS Cost Explorer</span>
                      <div>
                        <span className="mr-2">{voteCount} votes</span>
                        <Button onClick={handleVote} size="sm">Vote</Button>
                      </div>
                    </li>
                    {/* Add more feature requests here */}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="slack-community">
            <Card>
              <CardHeader>
                <CardTitle>Slack Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">Join our Slack community to connect with other founders, share feedback, and get support.</p>
                <Button>Join Slack Community</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources">
            <Card>
              <CardHeader>
                <CardTitle>Founder Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-blue-500 hover:underline">Contract Templates</a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-500 hover:underline">Pitch Deck Guide</a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-500 hover:underline">Fundraising Best Practices</a>
                  </li>
                  {/* Add more resources here */}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle>Wring.co: Your Entrepreneur's Wingman</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              At Wring.co, we're more than just a cloud cost optimization tool. We're your partner in building and 
              scaling your startup. Our Founder's Hub is designed to provide you with the resources, community, 
              and support you need to succeed.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}