import EditUser from "@/components/forms/EditUser";
import User from "@/database-models/user.model";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await User.findById(id);
  return (
    <div>
      <h1 className="h1-bold mb-10">Edit Profile</h1>
      <EditUser user={JSON.parse(JSON.stringify(user))} />
    </div>
  );
};

export default page;
