import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowUpRight, DollarSign, Users, Calendar } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Dashboard({ user }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [timeFilter, setTimeFilter] = useState('6m');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/dashboardData?timeFilter=${timeFilter}`);
        if (!res.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        const data = await res.json();
        setDashboardData(data);
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
  if (!user || !dashboardData) return null;

  const { 
    cloudSpendTrends, 
    totalSavings, 
    savingsPercentage, 
    employeeEquivalent,
    yearToDateSavings,
    usageBreakdown
  } = dashboardData;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Dashboard</h1>
      
      <Alert className="mb-6">
        <AlertTitle className="text-xl">Hello {user.name},</AlertTitle>
        <AlertDescription>
          You have saved ${totalSavings.toLocaleString()} since you have logged in.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Savings Overview & Cloud Spend Trends</span>
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
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col justify-center items-center bg-secondary rounded-lg p-4">
                <DollarSign className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Total Savings</p>
                <p className="text-2xl font-bold">${totalSavings.toLocaleString()}</p>
              </div>
              <div className="flex flex-col justify-center items-center bg-secondary rounded-lg p-4">
                <ArrowUpRight className="h-8 w-8 text-green-500 mb-2" />
                <p className="text-sm text-muted-foreground">Savings Percentage</p>
                <p className="text-2xl font-bold">{savingsPercentage}%</p>
              </div>
              <div className="flex flex-col justify-center items-center bg-secondary rounded-lg p-4">
                <Users className="h-8 w-8 text-blue-500 mb-2" />
                <p className="text-sm text-muted-foreground">Employee Equivalent</p>
                <p className="text-2xl font-bold">{employeeEquivalent}</p>
              </div>
            </div>
            <div className="h-[400px]">
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
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2" />
              Year-To-Date Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-4xl font-bold text-primary mb-2">${yearToDateSavings.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total savings this year</p>
            </div>
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