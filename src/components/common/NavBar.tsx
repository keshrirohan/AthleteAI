"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ModeToggle";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({
    name: "User",
    image: "/defaultImg.png",
  });

  
  return (
    <header className="w-full border-b border-border bg-background backdrop-blur-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/home" className="text-2xl font-bold tracking-wide">
          <span className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-500">AthletiQ</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-lg font-medium">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <Link href="/tests" className="hover:text-primary transition-colors">
            Tests
          </Link>
          <Link href="/results" className="hover:text-primary transition-colors">
            Results
          </Link>
          <Link href="/leaderboard" className="hover:text-primary transition-colors">
            Leaderboard
          </Link>
          <Link href="/achievements" className="hover:text-primary transition-colors">
            Achievements
          </Link>
          <Link href="/help" className="hover:text-primary transition-colors">
            Help
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 mr-4">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/api/logout" className="text-red-600">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
            {/* <Button asChild className="rounded-xl hidden md:inline-flex">
              <Link href="/auth/login">Get Started</Link>
            </Button> */}

          {/* Dark Mode Toggle */}
          <ModeToggle />

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-sm transition-all duration-300">
          <div className="flex flex-col items-center gap-4 py-6">
            <Link href="/home" className="hover:text-primary text-lg" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/tests" className="hover:text-primary text-lg" onClick={() => setIsOpen(false)}>
              Tests
            </Link>
            <Link href="/results" className="hover:text-primary text-lg" onClick={() => setIsOpen(false)}>
              Results
            </Link>
            <Link href="/leaderboard" className="hover:text-primary text-lg" onClick={() => setIsOpen(false)}>
              Leaderboard
            </Link>
            <Link href="/achievements" className="hover:text-primary text-lg" onClick={() => setIsOpen(false)}>
              Achievements
            </Link>
            <Link href="/help" className="hover:text-primary text-lg" onClick={() => setIsOpen(false)}>
              Help
            </Link>
            <Link href="/about" className="hover:text-primary text-lg" onClick={() => setIsOpen(false)}>
              About
            </Link>
              <Button asChild className="rounded-xl w-[150px]" onClick={() => setIsOpen(false)}>
                <Link href="/auth/login">Get Started</Link>
              </Button>
          </div>
        </div>
      )}
    </header>
  );
}
