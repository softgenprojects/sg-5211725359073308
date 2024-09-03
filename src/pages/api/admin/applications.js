export default function handler(req, res) {
  // Mock data for applications
  const applications = [
    { id: 1, name: 'Company A', status: 'Pending', savings: 5000 },
    { id: 2, name: 'Company B', status: 'Approved', savings: 10000 },
    { id: 3, name: 'Company C', status: 'Rejected', savings: 3000 },
  ];

  res.status(200).json(applications);
}