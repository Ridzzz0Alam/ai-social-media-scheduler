"use client"
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useAuth();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b  border-b border-border/60 bg-background/90 backdrop-b">
        <Logo />
        <nav></nav>
 
        <div className="flex items-center gap-3">
          {!isSignedIn ? (
            <>
              <Button asChild variant="outline" className="rounded-full px-5"
              >
                <Link href="/sign-in">Log In</Link>
              </Button>
              <Button asChild className="rounded-full px-5 text-primary-foreground"
              >
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          )}
        </div>
      </header>
    </div>
  );
}
