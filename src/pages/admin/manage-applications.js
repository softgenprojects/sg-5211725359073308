import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

export default function ManageApplications() {
  const [applications, setApplications] = useState([]);
  const [takeRate, setTakeRate] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setIsLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch('/api/admin/applications');
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
      const data = await response.json();
      setApplications(data);
    } catch (err) {
      setError(err.message);
      toast({
        title: 'Error',
        description: 'Failed to load applications. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Replace with actual API call
      const response = await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Failed to update application status');
      }
      setApplications(applications.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
      toast({
        title: 'Status Updated',
        description: `Application status changed to ${newStatus}`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update application status. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleTakeRateChange = async (e) => {
    const newTakeRate = e.target.value;
    setTakeRate(newTakeRate);
    try {
      // Replace with actual API call
      const response = await fetch('/api/admin/takeRate', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ takeRate: newTakeRate }),
      });
      if (!response.ok) {
        throw new Error('Failed to update take rate');
      }
      toast({
        title: 'Take Rate Updated',
        description: `New take rate set to ${newTakeRate}%`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update take rate. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <Layout><div className="container mx-auto p-6">Loading...</div></Layout>;
  }

  if (error) {
    return <Layout><div className="container mx-auto p-6">Error: {error}</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Manage Applications</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Pending Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Potential Savings</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>{app.status}</TableCell>
                    <TableCell>${app.savings}</TableCell>
                    <TableCell>
                      <Button 
                        onClick={() => handleStatusChange(app.id, 'Approved')}
                        variant="outline"
                        size="sm"
                        className="mr-2"
                      >
                        Approve
                      </Button>
                      <Button 
                        onClick={() => handleStatusChange(app.id, 'Rejected')}
                        variant="outline"
                        size="sm"
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Adjust Take Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Label htmlFor="take-rate">Take Rate (%)</Label>
              <Input
                id="take-rate"
                type="number"
                value={takeRate}
                onChange={handleTakeRateChange}
                className="w-20"
              />
              <Button onClick={() => handleTakeRateChange({ target: { value: takeRate } })}>
                Update Take Rate
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}