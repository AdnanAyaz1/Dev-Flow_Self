import React from "react";
import SidebarLinks from "./SidebarLinks";
import LogoutButton from "../navbar/LogoutButton";
import AuthButtons from "../navbar/AuthButtons";
import { auth } from "@/auth";

const LeftSidebar = async () => {
  const session = await auth();
  return (
    <section className="sticky top-0 left-0 bg-light-900  dark:bg-dark-200 pt-[48px] pb-[33px] flex flex-col flex-1 justify-between gap-8 h-[calc(100vh-100px)] z-[0] px-[24px] border-r-[1px] shadow-sidebar-shadow dark:shadow-none  min-w-[266px] max-w-[266px] overflow-y-auto custom-scrollbar">
      {/* Links */}
      <SidebarLinks />
      {/* Auth Buttons */}
      {session?.user ? <LogoutButton /> : <AuthButtons />}
    </section>
  );
};

export default LeftSidebar;
