const fs = require("fs");
const env = fs.readFileSync(".env.local", "utf8");
const get = (k) =>
  env
    .split("\n")
    .find((l) => l.startsWith(k + "="))
    ?.split("=")
    .slice(1)
    .join("=")
    .trim()
    .replace(/^["']|["']$/g, "");
const key = get("STRIPE_SECRET_KEY");
if (!key) {
  console.log("NO KEY FOUND");
  process.exit(1);
}
console.log(
  "Key prefix:",
  key.slice(0, 7) + "... (mode: " + (key.startsWith("sk_live") ? "LIVE" : key.startsWith("sk_test") ? "TEST" : "UNKNOWN") + ")"
);
fetch("https://api.stripe.com/v1/balance", {
  headers: { Authorization: "Bearer " + key },
})
  .then(async (r) => {
    const body = await r.json();
    if (r.ok) {
      console.log("VALID - balance available:", body.available.map((b) => b.amount / 100 + " " + b.currency.toUpperCase()).join(", ") || "(0 EUR)");
    } else {
      console.log("INVALID -", r.status, body.error && body.error.message);
    }
  })
  .catch((e) => console.error("Request failed:", e.message));
