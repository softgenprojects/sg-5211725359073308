import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ArrowUpRight, DollarSign, Users } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function Dashboard({ user, cloudSpendTrends }) {
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

  if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div></div>;
  if (error) return <div className="text-red-600 text-center mt-8">Error: {error}</div>;
  if (!user || !dashboardData) return null;

  const { 
    totalSavings, 
    savingsPercentage, 
    employeeEquivalent,
    usageBreakdown
  } = dashboardData;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      
      <div className="bg-blue-600 text-white p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Hello {user.name},</h2>
        <p className="text-lg">
          You have saved <span className="font-bold">${totalSavings.toLocaleString()}</span> since you have logged in.
        </p>
      </div>

      <Card className="mb-6">
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
            <div className="bg-white p-4 rounded-lg shadow">
              <DollarSign className="h-8 w-8 text-blue-600 mb-2" />
              <p className="text-sm text-gray-600">Total Savings</p>
              <p className="text-2xl font-bold text-gray-800">${totalSavings.toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <ArrowUpRight className="h-8 w-8 text-green-500 mb-2" />
              <p className="text-sm text-gray-600">Savings Percentage</p>
              <p className="text-2xl font-bold text-gray-800">{savingsPercentage}%</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <Users className="h-8 w-8 text-blue-500 mb-2" />
              <p className="text-sm text-gray-600">Employee Equivalent</p>
              <p className="text-2xl font-bold text-gray-800">{employeeEquivalent}</p>
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
                <Bar dataKey="actualCost" stackId="a" fill="#6772e5" name="Actual Cost" />
                <Bar dataKey="spendWithoutWring" stackId="a" fill="#9cdbff" name="Spend Without Wring" />
                <Bar dataKey="wringSpend" stackId="a" fill="#24b47e" name="Wring Savings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usage Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600">Subscription Id</TableHead>
                <TableHead className="text-gray-600">Type</TableHead>
                <TableHead className="text-gray-600">Term</TableHead>
                <TableHead className="text-gray-600">End Date</TableHead>
                <TableHead className="text-gray-600">Qty</TableHead>
                <TableHead className="text-gray-600">Regions</TableHead>
                <TableHead className="text-gray-600">Purchaser</TableHead>
                <TableHead className="text-gray-600">Discount Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usageBreakdown.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{item.subscriptionId}</TableCell>
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