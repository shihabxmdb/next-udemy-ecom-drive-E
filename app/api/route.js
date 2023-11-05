import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";

export async function GET(req) {
  if (await dbConnect()) {
    console.log("db connected....");
  } else {
    console.log("db not connected....");
  }
  return NextResponse.json({ time: new Date().toLocaleString() });
}
