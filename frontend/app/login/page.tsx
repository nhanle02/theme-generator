"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      const data = await res.json();

      // lưu token
      localStorage.setItem("token", data.access_token);

      // 🔥 chuyển trang
      router.push("/users"); // hoặc "/"
    } catch (err) {
      console.error("LOGIN ERROR:", err);
    }
  }

  return (
    <div
      className="
      flex
      justify-center
      items-center
      min-h-screen
      "
    >
      <Form
        onSubmit={handleSubmit}
        className="
        w-[400px]
        border
        rounded-lg
        p-6
        space-y-4
        "
      >
        <h1 className="text-2xl">
          Login
        </h1>

        <Input
          label="Email"
          type="email"
          placeholder="Nhập email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value,
            )
          }
        />

        <Input
          label="Password"
          type="password"
          placeholder="Nhập password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value,
            )
          }
        />

        <Button
          type="submit"
        >
          Login
        </Button>
      </Form>
    </div>
  );
}