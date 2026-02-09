import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL!,
});

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params; // <-- THIS is the fix

  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: numericId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
