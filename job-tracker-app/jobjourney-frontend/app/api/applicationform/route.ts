import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    // 1️⃣ Get token from cookies
    const cookieHeader = req.headers.get("cookie");
    if (!cookieHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = cookieHeader
      .split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2️⃣ Verify JWT
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET missing");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: number;
    };

    const userId = decoded.userId;

    // 3️⃣ Read body data
   // 3️⃣ Read body data
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

// 👉 ADD THIS LINE (status mapping)
const mappedStatus =
  status === "In progress" ? "InProgress" : status;

// 4️⃣ Create application
const application = await prisma.application.create({
  data: {
    role,
    company_name: companyName,
    job_location: jobLocation,
    status: mappedStatus, // 👈 use mappedStatus instead of status
    applied_date: new Date(appliedDate),
    description,
    cv_version: cvVersion,
    userId,
  },
});


    return NextResponse.json({
      message: "Application created",
      application,
    });
  } catch (error) {
    console.error("CREATE APPLICATION ERROR:", error);
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}
