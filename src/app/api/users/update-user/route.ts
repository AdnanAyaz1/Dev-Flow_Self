
import User from "@/database-models/user.model";
import dbConnect from "@/lib/database-connection";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const data = await req.json();
  try {
    await dbConnect();
    const id = data._id;
    delete data["_id"];
    await User.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(
      { success: true, message: "User Updated" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }
  }
}
