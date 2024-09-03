import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ManageApplications() {
  const [applications, setApplications] = useState([]);
  const [takeRate, setTakeRate] = useState(10);

  useEffect(() => {
    // Fetch applications data
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    // Replace with actual API call
    const mockApplications = [
      { id: 1, name: 'Company A', status: 'Pending', savings: 5000 },
      { id: 2, name: 'Company B', status: 'Approved', savings: 10000 },
      { id: 3, name: 'Company C', status: 'Rejected', savings: 3000 },
    ];
    setApplications(mockApplications);
  };

  const handleStatusChange = (id, newStatus) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  const handleTakeRateChange = (e) => {
    setTakeRate(e.target.value);
  };

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
              <Button>Update Take Rate</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}