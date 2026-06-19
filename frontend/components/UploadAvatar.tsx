// "use client";

// import { useState } from "react";
// import { uploadAvatar } from "../lib/users.api";

// export default function UploadAvatar() {
//   const [file, setFile] = useState<File | null>(null);
//   const [url, setUrl] = useState("");

//   const handleUpload = async () => {
//     if (!file) return;

//     const res = await uploadAvatar(file);
//     setUrl(res.avatar_url);
//   };

//   return (
//     <div className="space-y-3">
//       <input
//         type="file"
//         accept="image/*"
//         onChange={(e) => setFile(e.target.files?.[0] || null)}
//       />

//       <button
//         onClick={handleUpload}
//         className="bg-blue-500 text-white px-3 py-1 rounded"
//       >
//         Upload
//       </button>

//       {url && (
//         <img src={url} className="w-24 h-24 rounded-full" />
//       )}
//     </div>
//   );
// }