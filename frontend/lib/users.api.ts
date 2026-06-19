const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function uploadAvatar(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${BASE_URL}/users/upload-avatar`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}