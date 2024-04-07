"use client"

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: "600"
})

export default function Home() {
  return (
    <main className="flex flex-col h-full items-center justify-center bg-sky-500">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-6xl font-semibold text-white drop-shadow-md", font.className)}>Auth</h1>
        <p className="text-white text-lg">A simple Authentication Service</p>
      </div>
      <LoginButton>
        <Button variant={"secondary"} size={"lg"}>
          Sign In
        </Button>
      </LoginButton>
    </main>
  );
}
