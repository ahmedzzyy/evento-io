"use client"

import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/services/authService";

export default function LoginPage() {
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push("/");
            // TODO Redirect to profile page
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await loginUser({ email, password });
            if ("token" in response) {
                localStorage.setItem("token", response.token);
            }

            router.push("/");
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <main className="flex-grow flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Log In</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-salmon-600 hover:bg-salmon-700 text-white">
                        Log In
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Don&#39;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-salmon-600 hover:text-salmon-500 dark:text-salmon-400 dark:hover:text-salmon-300"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
    );
}