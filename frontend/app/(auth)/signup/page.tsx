"use client"

import type React from "react";
import { useActionState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { signupAction } from "@/app/actions/auth";

export default function SignupPage() {
    const [state, action, pending] = useActionState(signupAction, { errors: {} });

    return (
        <main className="flex-grow flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Sign Up</h2>
                <form action={action} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" name="name" required />
                    </div>
                    {state?.errors?.username && <p className="text-red-500 text-sm">{state.errors.username[0]}</p>}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" required />
                    </div>
                    {state?.errors?.email && <p className="text-red-500 text-sm">{state.errors.email[0]}</p>}

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" name="password" required />
                    </div>
                    {state?.errors?.password && (<p className="text-red-500 text-sm">{state.errors.password[0]}</p>)}

                    <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <Select name="role" required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="attendee">Attendee</SelectItem>
                                <SelectItem value="organizer">Organizer</SelectItem>
                            </SelectContent>
                        </Select>
                        {state?.errors?.role && <p className="text-red-500 text-sm">{state.errors.role[0]}</p>}
                    </div>
                    <Button disabled={pending} type="submit" className="w-full bg-salmon-600 hover:bg-salmon-700 text-white">
                        {pending ? "Signing up..." : "Sign Up"}
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