import { routes } from "@/constants/routes";
import { redirect } from "next/navigation";
import React from "react";


const page = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  if (!id) {
    redirect(routes.signIn);
  }
  return <div>page</div>;
};

export default page;
