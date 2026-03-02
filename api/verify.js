export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    const body = req.body;
    const token = body?.token;

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

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
