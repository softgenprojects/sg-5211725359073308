import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowUpRight } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Dashboard({ user }) {
  const [cloudSpendTrends, setCloudSpendTrends] = useState([]);
  const [usageBreakdown, setUsageBreakdown] = useState([]);
  const [timeFilter, setTimeFilter] = useState('6m');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [trendsRes, usageRes] = await Promise.all([
          fetch(`/api/cloudSpendTrends?timeFilter=${timeFilter}`),
          fetch('/api/usageBreakdown')
        ]);

        if (!trendsRes.ok || !usageRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const trendsData = await trendsRes.json();
        const usageData = await usageRes.json();

        setCloudSpendTrends(trendsData);
        setUsageBreakdown(usageData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeFilter]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;

  const totalSavings = cloudSpendTrends.reduce((acc, curr) => acc + curr.wringSpend, 0);
  const totalSpendWithoutWring = cloudSpendTrends.reduce((acc, curr) => acc + curr.spendWithoutWring, 0);
  const savingsPercentage = ((totalSpendWithoutWring - totalSavings) / totalSpendWithoutWring * 100).toFixed(2);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      
      <Alert className="mb-6">
        <AlertTitle className="text-xl">Hello {user.name},</AlertTitle>
        <AlertDescription>
          You have saved ${totalSavings.toLocaleString()} since you have logged in.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Cloud Spend Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cloudSpendTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="actualCost" stackId="a" fill="#8884d8" name="Actual Cost" />
                <Bar dataKey="spendWithoutWring" stackId="a" fill="#82ca9d" name="Spend Without Wring" />
                <Bar dataKey="wringSpend" stackId="a" fill="#ffc658" name="Wring Savings" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Savings Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">${totalSavings.toLocaleString()}</div>
            <p className="text-muted-foreground mb-4">Total savings in the last {timeFilter}</p>
            <div className="flex items-center text-green-500 mb-4">
              <ArrowUpRight className="mr-2" />
              <span className="text-lg font-semibold">{savingsPercentage}% savings</span>
            </div>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Usage Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subscription Id</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Term</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Regions</TableHead>
                <TableHead>Purchaser</TableHead>
                <TableHead>Discount Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usageBreakdown.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.subscriptionId}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.term}</TableCell>
                  <TableCell>{item.endDate}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>{item.regions}</TableCell>
                  <TableCell>{item.purchaser}</TableCell>
                  <TableCell>{item.discountRate}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}