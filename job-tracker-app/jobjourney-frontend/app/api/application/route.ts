import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    // 1) Get token from cookies (safe)
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2) Verify JWT
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing");

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };
    const userId = decoded.userId;

    // 3) Read body
    const body = await req.json();
    const {
      role,
      companyName,
      jobLocation,
      status,
      appliedDate,
      description,
      cvVersion,
    } = body;

    // 4) Map status to Prisma enum
    const mappedStatus =
      status === "In progress" || status === "In Progress"
        ? "InProgress"
        : status;

    if (!["Applied", "InProgress", "Rejected"].includes(mappedStatus)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // 5) Create application
    const application = await prisma.application.create({
      data: {
        userId,
        role: role ?? null,
        company_name: companyName,
        job_location: jobLocation,
        cv_version: cvVersion ?? null,
        status: mappedStatus as any,
        applied_date: new Date(appliedDate),
        description: description ?? "",
      },
    });

    return NextResponse.json({ message: "Application created", application }, { status: 201 });
  } catch (error) {
    console.error("CREATE APPLICATION ERROR:", error);
    return NextResponse.json({ error: "Failed to create application" }, { status: 500 });
  }
}