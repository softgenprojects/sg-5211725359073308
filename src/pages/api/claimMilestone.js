export default function handler(req, res) {
  if (req.method === 'POST') {
    const { milestoneId } = req.body;

    // Here you would typically update the milestone status in your database
    // For this example, we'll just simulate a successful claim

    console.log(`Milestone ${milestoneId} claimed successfully`);

    res.status(200).json({ message: 'Milestone claimed successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}