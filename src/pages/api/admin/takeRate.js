export default function handler(req, res) {
  if (req.method === 'PUT') {
    const { takeRate } = req.body;
    // Here you would typically update the take rate in your database
    // For this example, we'll just send back a success response
    res.status(200).json({ message: 'Take rate updated successfully', takeRate });
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}