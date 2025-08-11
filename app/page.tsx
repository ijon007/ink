import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1 className="text-4xl font-bold">ink.</h1>
            <p className="text-lg text-muted-foreground">
                A simple, beautiful, and powerful text editor and form builder.
            </p>
            <Link href="/app">
                <Button>Get Started</Button>
            </Link>
        </div>
    );
}
