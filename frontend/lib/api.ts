const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;

async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
) {
  const token =
    localStorage.getItem(
      "token",
    );

  const headers = {
    "Content-Type":
      "application/json",

    ...(token && {
      Authorization:
        `Bearer ${token}`,
    }),

    ...options.headers,
  };

  const response =
    await fetch(
      `${BASE_URL}${endpoint}`,
      {
        ...options,
        headers,
      },
    );

  if (!response.ok) {
    throw new Error(
      "Request failed",
    );
  }

  return response.json();
}

export default apiFetch;