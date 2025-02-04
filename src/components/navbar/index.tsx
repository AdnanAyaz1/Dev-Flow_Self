import React from "react";
import Logo from "./Logo";
import GlobalSearch from "../search/GlobalSearch";
import { DarkModeToggle } from "../dark-mode-toggler";
import Link from "next/link";
import { User } from "lucide-react";
import MobileNavigation from "./MobileNavigation";
import { auth } from "@/auth";
import Image from "next/image";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="sticky top-0 flex-between gap-12 px-[20px] md:px-[50px] py-[20px] max-h-[100px] z-20  bg-white border-b-[1px]    dark:bg-dark-200">
      {/* Logo */}
      <Logo />
      {/* Global Search */}
      <GlobalSearch />
      <div className="flex gap-4 items-center">
        {/* Dark Mode Toggler */}
        <DarkModeToggle />
        {/* User Profile */}
        <Link href="/user">
          {session?.user ? (
            <Image
              src={session?.user?.image || "/images/person-placeholder.jpeg"}
              alt="user image"
              width={35}
              height={35}
              className="rounded-full "
            />
          ) : (
            <div className="p-2  border-[2px] rounded-full border-black dark:border-white">
              <User className="w-4 h-4 dark:text-gray-100 text-gray-900" />
            </div>
          )}
        </Link>
        {/* Mobile Navigation */}
        <MobileNavigation />
      </div>
    </nav>
  );
};

export default Navbar;
