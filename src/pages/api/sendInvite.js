export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Here you would typically send an email invitation
    // For this example, we'll just simulate a successful invitation

    console.log(`Invitation sent to: ${email}`);

    res.status(200).json({ message: 'Invitation sent successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}