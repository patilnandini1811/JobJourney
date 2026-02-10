import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL!,
});

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return NextResponse.json({ error: "Invalid Username" }, { status: 401 });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return NextResponse.json({ error: "Invalid Password" }, { status: 401 });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  const res = NextResponse.json({
    message: "Logged in",
    user: { id: user.id, email: user.email, username: user.username },
  });
  res.cookies.set("token", token, { httpOnly: true, secure: true });

  return res;
}
