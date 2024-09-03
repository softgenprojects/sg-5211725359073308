import { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

export default function Settings() {
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Member' },
  ]);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Member' });
  const [billingInfo, setBillingInfo] = useState({
    cardNumber: '**** **** **** 1234',
    expiryDate: '12/24',
    cvv: '***',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
  });

  const handleAddMember = (e) => {
    e.preventDefault();
    setTeamMembers([...teamMembers, { ...newMember, id: Date.now() }]);
    setNewMember({ name: '', email: '', role: 'Member' });
    toast({
      title: "Team Member Added",
      description: `${newMember.name} has been added to your team.`,
    });
  };

  const handleUpdateBilling = (e) => {
    e.preventDefault();
    // Simulating API call to update billing info
    toast({
      title: "Billing Information Updated",
      description: "Your billing information has been successfully updated.",
    });
  };

  const handleDeleteAccount = () => {
    // Simulating account deletion process
    toast({
      title: "Account Deleted",
      description: "Your account has been successfully deleted.",
      variant: "destructive",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Settings</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Team Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-sm text-muted-foreground">{member.email}</p>
                  </div>
                  <span className="text-sm">{member.role}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleAddMember} className="mt-4 space-y-4">
              <Input
                placeholder="Name"
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                required
              />
              <Button type="submit">Add Team Member</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Connect Wring.co with other tools and services.</p>
            <Button className="mt-4">Manage Integrations</Button>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Billing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdateBilling} className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  value={billingInfo.cardNumber}
                  onChange={(e) => setBillingInfo({ ...billingInfo, cardNumber: e.target.value })}
                  required
                />
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    value={billingInfo.expiryDate}
                    onChange={(e) => setBillingInfo({ ...billingInfo, expiryDate: e.target.value })}
                    required
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    value={billingInfo.cvv}
                    onChange={(e) => setBillingInfo({ ...billingInfo, cvv: e.target.value })}
                    required
                  />
                </div>
              </div>
              <Button type="submit">Update Billing Info</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <Switch
                  id="emailNotifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <Switch
                  id="pushNotifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Permanently delete your Wring.co account. This action cannot be undone.</p>
            <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}