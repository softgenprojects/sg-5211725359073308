import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Settings() {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Settings</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Team Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage your team members and their access levels here.</p>
            <Button className="mt-4">Manage Team</Button>
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
            <p>Manage your billing details and payment methods.</p>
            <Button className="mt-4">Update Billing Info</Button>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Invoices</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View and download your past invoices.</p>
            <Button className="mt-4">View Invoices</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Delete Account</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Permanently delete your Wring.co account.</p>
            <Button variant="destructive" className="mt-4">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}