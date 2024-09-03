import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AnalyzeBehavior() {
  const [pageVisits, setPageVisits] = useState([]);
  const [cloudUsage, setCloudUsage] = useState([]);

  useEffect(() => {
    // Fetch analytics data
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    // Replace with actual API calls
    const mockPageVisits = [
      { date: '2023-05-01', visits: 100 },
      { date: '2023-05-02', visits: 150 },
      { date: '2023-05-03', visits: 200 },
      { date: '2023-05-04', visits: 180 },
      { date: '2023-05-05', visits: 220 },
    ];
    setPageVisits(mockPageVisits);

    const mockCloudUsage = [
      { date: '2023-05-01', usage: 5000 },
      { date: '2023-05-02', usage: 5500 },
      { date: '2023-05-03', usage: 4800 },
      { date: '2023-05-04', usage: 6000 },
      { date: '2023-05-05', usage: 5200 },
    ];
    setCloudUsage(mockCloudUsage);
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Analyze User Behavior</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Page Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pageVisits}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="visits" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cloud Usage Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cloudUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="usage" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}