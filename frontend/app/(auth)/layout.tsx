import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import type React from "react";

export default function AuthLayout({
    children,
}: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
            <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <Link href="/" className="text-2xl font-bold text-salmon-600 dark:text-salmon-400 tracking-tight">
                        Evento.io
                    </Link>
                    <ThemeToggle />
                </div>
            </header>
            { children }
        </div>
    );
}