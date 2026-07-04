"use client";

import { useState } from "react";
import Link from "next/link";

import { useForm } from "react-hook-form";

import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

import { register as registerUser } from "@/services/auth";

const schema = z.object({
  full_name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      await registerUser(data);

      alert("Registration successful");

      reset();

      window.location.href = "/login";
    } catch {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">

        <h1 className="mb-6 text-3xl font-bold">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="Username"
            error={errors.full_name?.message}
            {...register("full_name")}
          />

          <Input
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            isLoading={loading}
          >
            Register
          </Button>

        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>

      </Card>
    </main>
  );
}