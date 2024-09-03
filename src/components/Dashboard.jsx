import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, DollarSign, Users } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function Dashboard({ user, cloudSpendTrends }) {
  const [isLoading, setIsLoading] = useState(true);
  const [usageBreakdown, setUsageBreakdown] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchUsageBreakdown = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/usageBreakdown');
        const data = await response.json();
        setUsageBreakdown(data);
      } catch (error) {
        console.error('Failed to fetch usage breakdown:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsageBreakdown();
  }, []);

  const handleServiceClick = (service) => {
    setSelectedService(service === selectedService ? null : service);
  };

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
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array(3).fill().map((_, index) => (
                <Skeleton key={index} className="h-20 w-full" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {usageBreakdown.map(({ service, cost }) => (
                  <Button
                    key={service}
                    variant={selectedService === service ? "secondary" : "outline"}
                    className="flex items-center justify-between p-4 h-auto"
                    onClick={() => handleServiceClick(service)}
                  >
                    <span className="font-semibold">{service}</span>
                    <span className="text-lg">${cost.toLocaleString()}</span>
                  </Button>
                ))}
              </div>
              {selectedService && (
                <div className="mt-4 h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cloudSpendTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="spend" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </>
          )}
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