export default function handler(req, res) {
  const { timeFilter } = req.query;
  
  // Mock data generation based on timeFilter
  const generateData = (months) => {
    const data = [];
    let totalSavings = 0;
    for (let i = 0; i < months; i++) {
      const actualCost = Math.floor(Math.random() * 10000) + 5000;
      const spendWithoutWring = actualCost * 1.2;
      const wringSpend = spendWithoutWring - actualCost;
      totalSavings += wringSpend;
      data.push({
        name: `Month ${i + 1}`,
        actualCost,
        spendWithoutWring,
        wringSpend
      });
    }
    return { data, totalSavings };
  };

  let { data: cloudSpendTrends, totalSavings } = generateData(getMonthsFromTimeFilter(timeFilter));

  const savingsPercentage = ((totalSavings / (totalSavings + cloudSpendTrends.reduce((acc, curr) => acc + curr.actualCost, 0))) * 100).toFixed(2);
  const employeeEquivalent = Math.floor(totalSavings / 5000); // Assuming $5000 per employee
  const yearToDateSavings = Math.floor(Math.random() * 1000000) + 500000; // Random YTD savings between 500k and 1.5M

  // Mock usage breakdown data
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

  res.status(200).json({
    cloudSpendTrends,
    totalSavings,
    savingsPercentage,
    employeeEquivalent,
    yearToDateSavings,
    usageBreakdown
  });
}

function getMonthsFromTimeFilter(timeFilter) {
  switch (timeFilter) {
    case '1m':
      return 1;
    case '3m':
      return 3;
    case '6m':
      return 6;
    case '1y':
      return 12;
    default:
      return 6;
  }
}