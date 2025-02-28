import Link from "next/link";

import { ThemeToggle } from "./theme-toggle";
import MobileNav from "./MobileNav";
import { Button } from "./ui/button";

export default function Navbar() {
    return (
        <header className="bg-white border-b dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
                <div className="flex justify-between items-center w-full sm:w-auto mb-4 sm:mb-0">
                    <Link href="/" className="text-2xl font-bold text-salmon-600 dark:text-salmon-400 tracking-tight mr-4">
                        Evento.io
                    </Link>
                    <div className="flex items-center space-x-2">
                        <ThemeToggle />
                        <MobileNav />
                    </div>
                </div>
                <nav className="hidden sm:flex items-center space-x-4">
                    <Link href="#" className="text-gray-600 hover:text-salmon-600 dark:text-gray-300 dark:hover:text-salmon-400">
                        Browse Events
                    </Link>
                    <Link href="#" className="text-gray-600 hover:text-salmon-600 dark:text-gray-300 dark:hover:text-salmon-400">
                        Create Event
                    </Link>
                    <Link href="/login" className="text-gray-600 hover:text-salmon-600 dark:text-gray-300 dark:hover:text-salmon-400">
                        Login
                    </Link>
                    <Button className="bg-gradient-to-r from-salmon-500 to-salmon-600 hover:from-salmon-600 hover:to-salmon-700 text-white shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                </nav>
            </div>
        </header>
    );
}