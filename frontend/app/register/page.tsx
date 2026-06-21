"use client";

import {
  useState,
} from "react";

import { useRouter } from "next/navigation";

import Form from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function RegisterPage() {
  const router =
    useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  async function handleSubmit(
    e: React.FormEvent,
  ) {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            name,
            password,
          }),
        },
      );

      const data =
        await res.json();

      if (!res.ok) {
        throw new Error(
          data.message ||
          "Login failed"
        );
      }
      router.push(
        "/login"
      );

    } catch (err) {
      console.error(
        "LOGIN ERROR:",
        err
      );
    }
  }

  return (
    <div
      className="
      min-h-screen
      flex
      justify-center
      items-center
      "
    >
      <Form
        onSubmit={
          handleSubmit
        }
        className="
        w-[400px]
        border
        rounded-lg
        p-6
        space-y-4
        "
      >
        <h1 className="text-2xl">
          Register
        </h1>

        <Input
          label="Name"
          value={name}
          onChange={(e) =>
            setName(
              e.target.value,
            )
          }
        />

        <Input
          label="Email"
          type="email"
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
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value,
            )
          }
        />
        <div
            className="
            text-center
            text-sm
            "
        >
            Đã có tài khoản?{" "}
            <Link
                href="/login"
                className="
                text-blue-500
                hover:underline
                "
            >
                Đăng nhập
            </Link>
        </div>
         <Button
          type="submit"
        >
          Register
        </Button>
      </Form>
      
    </div>
  );
}