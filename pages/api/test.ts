export default async function handler(req, res) {
  console.log("Fetching...");
  res.status(200).json({ name: "John Doe" });
}
