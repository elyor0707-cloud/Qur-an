export default function handler(req, res) {
  const { token } = req.body;

  const validTokens = [
    "elyor-2025",
    "premium-777",
    "admin-master"
  ];

  if (!token) {
    return res.status(400).json({ success: false });
  }

  if (validTokens.includes(token)) {
    return res.status(200).json({ success: true });
  } else {
    return res.status(401).json({ success: false });
  }
}
