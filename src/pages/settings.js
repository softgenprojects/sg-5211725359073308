import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';

export default function Settings() {
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Member' },
  ]);

  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Slack', connected: true },
    { id: 2, name: 'GitHub', connected: false },
    { id: 3, name: 'Jira', connected: false },
  ]);

  const handleDeleteAccount = () => {
    // Implement account deletion logic here
    toast({
      title: "Account Deletion Requested",
      description: "Your account deletion request has been submitted. We'll process it within 24 hours.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">Settings</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Team Management</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button className="mt-4">Add Team Member</Button>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            {integrations.map((integration) => (
              <div key={integration.id} className="flex items-center justify-between py-2">
                <span>{integration.name}</span>
                <Switch
                  checked={integration.connected}
                  onCheckedChange={() => {
                    // Implement integration toggle logic here
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="**** **** **** 1234" />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" placeholder="MM/YY" />
                </div>
                <div className="flex-1">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" />
                </div>
              </div>
              <Button>Update Billing Information</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice Number</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>INV-001</TableCell>
                  <TableCell>2023-05-01</TableCell>
                  <TableCell>$99.99</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Download</Button>
                  </TableCell>
                </TableRow>
                {/* Add more invoice rows as needed */}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Warning: This action cannot be undone. All your data will be permanently deleted.</p>
            <Button variant="destructive" onClick={handleDeleteAccount}>Delete My Account</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}