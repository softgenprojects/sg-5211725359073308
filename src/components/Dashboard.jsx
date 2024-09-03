import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, DollarSign, Users } from 'lucide-react';

export default function Dashboard({ user, cloudSpendTrends }) {
  if (!user) return null;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      
      <Alert className="mb-6">
        <AlertTitle className="text-xl">Hello {user.name},</AlertTitle>
        <AlertDescription>
          You have saved ${user.savings.toLocaleString()} since you have logged in.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Cloud Spend Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cloudSpendTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="spend" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">${(user.savings * 6).toLocaleString()}</div>
            <p className="text-muted-foreground mb-4">Total savings in the last 6 months</p>
            <div className="flex items-center text-green-500 mb-4">
              <ArrowUpRight className="mr-2" />
              <span className="text-lg font-semibold">15% increase</span>
            </div>
            <p className="text-muted-foreground">
              This is equivalent to hiring {Math.floor(user.savings / 5000)} new employees!
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Usage Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['EC2', 'RDS', 'S3'].map((service) => (
              <div key={service} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <span className="font-semibold">{service}</span>
                <span className="text-lg">${Math.floor(Math.random() * 1000).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cost Optimization Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Right-size your EC2 instances to save up to 30%</li>
            <li>Utilize Reserved Instances for predictable workloads</li>
            <li>Implement auto-scaling to optimize resource usage</li>
          </ul>
          <Button className="mt-4">View All Recommendations</Button>
        </CardContent>
      </Card>
    </div>
  );
}