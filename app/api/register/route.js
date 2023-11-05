import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import User from "@/models/user";
import bcrypt from "bcrypt";
export async function POST(req) {
  await dbConnect();
  const body = await req.json();
  //console.log(body);
  const { name, email, password } = body;
  try {
    await new User({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    }).save();
    // console.log("user created=>", user);
    //console.log("Name:" + name + ", Email:" + email + ", password:" + password);
    return NextResponse.json({ success: "Registered Successfully" });
    //return NextResponse.json({ success: "Registration Sucessfull" });
  } catch (err) {
    //console.log("Error=>", err);
    return NextResponse.json({ err: err.message }, { status: 501 });
  }

  return;
}
