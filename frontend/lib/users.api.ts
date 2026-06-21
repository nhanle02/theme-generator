export async function getUsers() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  const text = await res.text(); // 👈 lấy raw response

  if (!res.ok) {
    throw new Error(`Failed: ${res.status} - ${text}`);
  }

  return JSON.parse(text);
}