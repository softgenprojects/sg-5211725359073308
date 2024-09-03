export default function handler(req, res) {
  const { timeFilter } = req.query;
  
  // Mock data generation based on timeFilter
  const generateData = (months) => {
    const data = [];
    for (let i = 0; i < months; i++) {
      const actualCost = Math.floor(Math.random() * 10000) + 5000;
      const spendWithoutWring = actualCost * 1.2;
      const wringSpend = spendWithoutWring - actualCost;
      data.push({
        name: `Month ${i + 1}`,
        actualCost,
        spendWithoutWring,
        wringSpend
      });
    }
    return data;
  };

  let data;
  switch (timeFilter) {
    case '1m':
      data = generateData(1);
      break;
    case '3m':
      data = generateData(3);
      break;
    case '6m':
      data = generateData(6);
      break;
    case '1y':
      data = generateData(12);
      break;
    default:
      data = generateData(6);
  }

  res.status(200).json(data);
}