const URL = process.env.DIVVUN_API_URL as string;

export default async function fetchSatni(payload: any) {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  console.log(URL);
  const data = await res.json();
  return data;
}
