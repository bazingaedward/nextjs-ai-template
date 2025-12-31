"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as Label from "@radix-ui/react-label";
import * as Separator from "@radix-ui/react-separator";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const action = (event.nativeEvent as any).submitter.value;
    formData.append("action", action);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An error occurred");
      } else {
        if (data.message) {
          setMessage(data.message);
        }
        if (data.redirect) {
          router.push(data.redirect);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-gray-400">Sign in to your account</p>
        </div>

        <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
          {(error || message) && (
            <div
              className={`mb-6 p-4 rounded-lg text-sm ${
                error
                  ? "bg-red-900/50 border border-red-700 text-red-200"
                  : "bg-green-900/50 border border-green-700 text-green-200"
              }`}
            >
              {error || message}
            </div>
          )}

          <div className="space-y-4">
            <form action="/api/auth/login" method="post">
                <input type="hidden" name="provider" value="google" />
                <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-white text-gray-900 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors font-medium"
                >
                <div className="i-ph:google-logo-bold mr-2 text-xl" />
                Continue with Google
                </button>
            </form>

            <form action="/api/auth/login" method="post">
                <input type="hidden" name="provider" value="github" />
                <button
                type="submit"
                className="w-full flex items-center justify-center px-4 py-2 bg-[#24292F] text-white rounded-lg hover:bg-[#24292F]/90 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors font-medium"
                >
                <div className="i-ph:github-logo-bold mr-2 text-xl" />
                Continue with GitHub
                </button>
            </form>
          </div>

          <div className="my-6 relative">
            <Separator.Root className="bg-gray-600 h-[1px] w-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 px-2 text-sm text-gray-400">
              Or continue with email
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label.Root
                  htmlFor="email"
                  className="text-sm font-medium text-gray-300"
                >
                  Email
                </Label.Root>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label.Root
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300"
                >
                  Password
                </Label.Root>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                type="submit"
                name="action"
                value="login"
                className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors font-medium"
              >
                Sign In
              </button>
              <button
                type="submit"
                name="action"
                value="signup"
                className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors font-medium"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-sm text-gray-400">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
