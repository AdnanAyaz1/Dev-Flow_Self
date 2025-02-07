import bcrypt from "bcryptjs";
import User from "@/database-models/user.model";
import dbConnect from "@/lib/database-connection";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log("Api git ", email, password);
  try {
    await dbConnect();
    const existingUser = await User.findOne({ email, provider: "credentials" });
    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "Invalid Email" },
        { status: 400 }
      );
    }
    const isValid = await bcrypt.compare(
      password as string,
      existingUser.password
    );
    if (!isValid)
      return NextResponse.json(
        { success: false, message: "Wrong Password" },
        { status: 400 }
      );
    return NextResponse.json(
      { success: true, user: existingUser },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
