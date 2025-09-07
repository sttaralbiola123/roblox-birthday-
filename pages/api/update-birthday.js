import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { cookie, month, day, year } = req.body;

  try {
    // Get CSRF token
    const csrfRes = await fetch("https://accountsettings.roblox.com/v1/email", {
      method: "POST",
      headers: { Cookie: cookie }
    });
    const token = csrfRes.headers.get("x-csrf-token");

    // Call Roblox API
    const response = await fetch("https://accountinformation.roblox.com/v1/birthdate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookie,
        "x-csrf-token": token
      },
      body: JSON.stringify({
        birthMonth: month,
        birthDay: day,
        birthYear: year
      })
    });

    const data = await response.json();
    res.status(response.status).json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
