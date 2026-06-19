const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`);

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}