import { ApiResponse } from "./type";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL;

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem(
          "token"
        )
      : null;

  const response =
    await fetch(
      `${BASE_URL}${endpoint}`,
      {
        ...options,

        credentials:
          "include",

        headers: {
          "Content-Type":
            "application/json",

          ...(token && {
            Authorization:
              `Bearer ${token}`,
          }),

          ...options.headers,
        },
      }
    );

  const json:
    ApiResponse<T> =
      await response.json();

  if (!response.ok) {
    throw new Error(
      json.message ||
      "Request failed"
    );
  }

  return json.data;
}

export default apiFetch;