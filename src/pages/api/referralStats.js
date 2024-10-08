export default function handler(req, res) {
  // Mock data for referral statistics
  const referralStats = {
    peopleReferred: 15,
    totalEarnings: 750,
    nextMilestone: {
      name: "$1,000 in Savings",
      progress: 75,
      description: "Receive a branded mug or 1K credits"
    },
    milestones: [
      {
        id: 1,
        name: "$1,000 in Savings",
        description: "Receive a branded mug or 1K credits",
        progress: 75,
        claimed: false
      },
      {
        id: 2,
        name: "$5,000 in Savings",
        description: "Get a $100 Amazon gift card",
        progress: 40,
        claimed: false
      },
      {
        id: 3,
        name: "$10,000 in Savings",
        description: "Earn a billboard ad in Times Square",
        progress: 20,
        claimed: false
      }
    ]
  };

  res.status(200).json(referralStats);
}