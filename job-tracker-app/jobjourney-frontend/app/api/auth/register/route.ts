import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL!,
});

export async function POST(req: Request) {
  const { username, email, password } = await req.json();

  // Basic validation
  if (!username || !email || !password) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  // Normalize email
  const normalizedEmail = String(email).trim().toLowerCase();
  const normalizedUsername = String(username).trim();

  // Check existing user (email OR username)
  const existing = await prisma.user.findFirst({
    where: {
      OR: [{ email: normalizedEmail }, { username: normalizedUsername }],
    },
  });

  if (existing) {
    return NextResponse.json(
      { error: "User already exists (email/username)" },
      { status: 409 }
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
    },
  });

  // Create token (same as login)
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  // Return response + set cookie
  const res = NextResponse.json({ message: "Registered" }, { status: 201 });
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: true, // NOTE: in local dev this may block cookie
    sameSite: "lax",
    path: "/",
  });

  return res;
}
