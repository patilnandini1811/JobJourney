import { PrismaClient, Status } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL!,
});

async function main() {
  // Soft reset: delete all rows (Accelerate‑safe)
  await prisma.application.deleteMany();
  await prisma.user.deleteMany();

  // Hash passwords
  const hashedPassword1 = await bcrypt.hash("hashedpassword123", 10);
  const hashedPassword2 = await bcrypt.hash("hashedpassword456", 10);

  // User 1
  const user1 = await prisma.user.create({
    data: {
      username: "brooke_dev",
      email: "brooke@example.com",
      password: hashedPassword1,
      application: {
        create: [
          {
            company_name: "Spotify",
            job_location: "Stockholm",
            status: Status.Applied,
            applied_date: new Date("2024-01-10"),
            description:
              "Frontend developer role focusing on React and TypeScript.",
          },
          {
            company_name: "Klarna",
            job_location: "Stockholm",
            status: Status.InProgress,
            applied_date: new Date("2024-01-15"),
            description:
              "Full‑stack position with emphasis on Node.js and microservices.",
          },
          {
            company_name: "IKEA",
            job_location: "Älmhult",
            status: Status.Rejected,
            applied_date: new Date("2024-01-20"),
            description:
              "UX‑focused frontend role with accessibility requirements.",
          },
        ],
      },
    },
  });

  // User 2
  const user2 = await prisma.user.create({
    data: {
      username: "nandini_dev",
      email: "nandini@example.com",
      password: hashedPassword2,
      application: {
        create: [
          {
            company_name: "Volvo",
            job_location: "Gothenburg",
            status: Status.Applied,
            applied_date: new Date("2024-02-01"),
            description:
              "Backend developer role working with APIs and cloud services.",
          },
          {
            company_name: "Ericsson",
            job_location: "Kista",
            status: Status.InProgress,
            applied_date: new Date("2024-02-05"),
            description:
              "Systems engineering role with distributed systems focus.",
          },
          {
            company_name: "H&M",
            job_location: "Stockholm",
            status: Status.Rejected,
            applied_date: new Date("2024-02-10"),
            description:
              "Frontend role with strong emphasis on design systems.",
          },
        ],
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
