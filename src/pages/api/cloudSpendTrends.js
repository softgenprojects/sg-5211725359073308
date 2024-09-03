export default function handler(req, res) {
  const data = [
    { name: 'Jan', spend: 4000 },
    { name: 'Feb', spend: 3000 },
    { name: 'Mar', spend: 2000 },
    { name: 'Apr', spend: 2780 },
    { name: 'May', spend: 1890 },
    { name: 'Jun', spend: 2390 },
  ];
  res.status(200).json(data);
}