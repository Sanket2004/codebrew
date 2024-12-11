"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ChartNoAxesGantt, Coffee, GithubIcon, LogOut } from "lucide-react";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  useEffect(() => {
    // Apply smooth scroll behavior to the html element
    document.documentElement.style.scrollBehavior = "smooth";

    // Cleanup on component unmount (optional)
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <nav className="bg-transparent py-2 px-4 fixed top-0 left-0 w-full z-50 shadow-sm backdrop-blur-xl flex justify-between items-center">
      <Link href={"/"}>
        <Image
          src={"/logo.svg"}
          width={0}
          height={0}
          alt="CodeBrew Logo"
          className="w-6 h-6 hover:rotate-90 hover:brightness-50 transition-all hover:drop-shadow-xl"
        />
      </Link>

      {/* Desktop menu */}
      <div className="hidden md:flex ">
        <div className="space-x-4 flex items-center">
          {!session.data?.user && (
            <>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#features"
              >
                Features
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#get-started"
              >
                Get Started
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#about"
              >
                About
              </Link>
              <Link
                className="text-sm font-medium hover:underline underline-offset-4"
                href="#faq"
              >
                FAQ
              </Link>
              <Button onClick={async () => await signIn("github")}>
                <GithubIcon /> Login with GitHub
              </Button>
            </>
          )}

          {session.data?.user && (
            <>
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage src={session.data?.user?.image} />
                    <AvatarFallback>
                      {session.data?.user?.name.split(" ")[0][0] +
                        session.data?.user?.name.split(" ")[1][0]}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                  <h1 className="text-sm font-bold text-gray-900">Account</h1>
                  <hr className="my-2" />
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={session.data?.user?.image} />
                      <AvatarFallback>
                        {session.data?.user?.name.split(" ")[0][0] +
                          session.data?.user?.name.split(" ")[1][0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center">
                      <h1 className="font-semibold text-sm break-all text-gray-800">
                        {session.data?.user?.name}
                      </h1>
                      <p className="text-xs break-all text-gray-500">
                        {session.data?.user?.email}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={async () => await signOut()}
                    className="w-full mt-2"
                    variant="outline"
                  >
                    Logout
                    <LogOut />
                  </Button>
                </PopoverContent>
              </Popover>
            </>
          )}
        </div>
      </div>

      {/* Drawer visible only on mobile */}
      <div className="md:hidden">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <div className="md:hidden flex ">
              <button className="active:bg-gray-100 p-1.5 rounded-xl active:ring ring-gray-300">
                <ChartNoAxesGantt className="text-black text-lg" />
              </button>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="text-left">
              <DrawerTitle>
                <Link href={"/"}>
                  <Image
                    src={"/logo.svg"}
                    width={0}
                    height={0}
                    alt="CodeBrew Logo"
                    className="w-6 h-6 hover:rotate-90 hover:brightness-50 transition-all hover:drop-shadow-xl"
                  />
                </Link>
              </DrawerTitle>
              <hr className="my-2" />
              <DrawerDescription>
                <div className="text-black flex items-center gap-2">
                  {session.data?.user && (
                    <>
                      <Avatar>
                        <AvatarImage src={session.data?.user?.image} />
                        <AvatarFallback>
                          {session.data?.user?.name.split(" ")[0][0] +
                            session.data?.user?.name.split(" ")[1][0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col break-all">
                        <span className="text-gray-950 font-semibold">
                          {session.data?.user.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {session.data?.user.email}
                        </span>
                      </div>
                    </>
                  )}
                  {!session.data?.user && (
                    <div className="flex flex-col gap-4">
                      <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="#features"
                      >
                        Features
                      </Link>
                      <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="#get-started"
                      >
                        Get Started
                      </Link>
                      <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="#about"
                      >
                        About
                      </Link>
                      <Link
                        className="text-sm font-medium hover:underline underline-offset-4"
                        href="#faq"
                      >
                        FAQ
                      </Link>
                    </div>
                  )}
                </div>
              </DrawerDescription>
            </DrawerHeader>
            <DrawerFooter className="pt-2">
              {session.data?.user && (
                <Button onClick={async () => await signOut()}>
                  Logout
                  <LogOut />
                </Button>
              )}
              {!session.data?.user && (
                <Button
                  onClick={async () => await signIn("github")}
                  className="w-full"
                >
                  <GithubIcon /> Login with GitHub
                </Button>
              )}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
