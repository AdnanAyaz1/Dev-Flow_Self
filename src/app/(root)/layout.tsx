import Navbar from "@/components/navbar";
import LeftSidebar from "@/components/navigation/LeftSidebar";
import RightSidebar from "@/components/navigation/RightSidebar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="max-w-[1440px] mx-auto ">
      <Navbar />
      <div className="flex ">
        <LeftSidebar />
        <section className="max-w-5xl w-[884px] h-[calc(100vh-100px)] overflow-y-scroll no-scrollbar px-[40px] pt-[65px] dark:bg-dark-200 pb-[33px]">
          {children}
        </section>
        <RightSidebar />
      </div>
    </div>
  );
};

export default layout;
