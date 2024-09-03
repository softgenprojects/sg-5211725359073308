export default function handler(req, res) {
  // Simulating API delay
  setTimeout(() => {
    const usageBreakdown = [
      { service: 'EC2', cost: Math.floor(Math.random() * 1000) },
      { service: 'RDS', cost: Math.floor(Math.random() * 1000) },
      { service: 'S3', cost: Math.floor(Math.random() * 1000) },
    ];
    res.status(200).json(usageBreakdown);
  }, 1000);
}