"use client"

import type React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { signupUser } from "@/services/authService";

export default function SignupPage() {
    useEffect(() => {
        if (localStorage.getItem("token")) {
            redirect("/")
            // TODO Redirect to profile page
        }
    }, []);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<"attendee" | "organizer" | null>(null);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (!role) {
                // TODO Better Error Handling
                return;
            }

            await signupUser({ username: name, email, password, role });

            router.push("/");
        } catch (error) {
            console.error('Error signing up:', error);
            // TODO Better Error Handling
        }
    }

    return (
        <main className="flex-grow flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
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
                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select onValueChange={(value: string) =>
                            setRole(value as "attendee" | "organizer")
                        } required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="attendee">Attendee</SelectItem>
                                <SelectItem value="organizer">Organizer</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" className="w-full bg-salmon-600 hover:bg-salmon-700 text-white">
                        Sign Up
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-salmon-600 hover:text-salmon-500 dark:text-salmon-400 dark:hover:text-salmon-300"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </main>
    );
}