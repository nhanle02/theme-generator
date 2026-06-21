export async function getUsers() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users`,
    {
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}