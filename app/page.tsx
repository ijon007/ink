import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center max-h-svh">
            <h1 className="text-4xl font-bold">ink.</h1>
            <p className="text-lg">
                A simple, beautiful, and powerful text editor.
            </p>
            <Link href="/app">
                <Button>Get Started</Button>
            </Link>
        </div>
    );
}
