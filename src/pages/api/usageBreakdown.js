export default function handler(req, res) {
  // Mock data for usage breakdown
  const usageBreakdown = [
    {
      subscriptionId: 'SUB-001',
      type: 'EC2',
      term: '1 Year',
      endDate: '2024-05-31',
      qty: 5,
      regions: 'us-east-1',
      purchaser: 'John Doe',
      discountRate: 20
    },
    {
      subscriptionId: 'SUB-002',
      type: 'RDS',
      term: '3 Years',
      endDate: '2026-05-31',
      qty: 2,
      regions: 'us-west-2',
      purchaser: 'Jane Smith',
      discountRate: 30
    },
    {
      subscriptionId: 'SUB-003',
      type: 'S3',
      term: 'On-Demand',
      endDate: 'N/A',
      qty: 1,
      regions: 'eu-central-1',
      purchaser: 'Bob Johnson',
      discountRate: 0
    }
  ];

  res.status(200).json(usageBreakdown);
}