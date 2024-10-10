import NavBar from "@/components/Navbar";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }) {
    return (
        <div className="app-wrapper">
            {/* Shared Layout: Navbar */}
            <NavBar />

            {/* Main Content */}
            <main>
                <Component {...pageProps} />
            </main>
        </div>
    );
}