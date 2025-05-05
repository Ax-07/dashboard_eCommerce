// exemple of a seed file

import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Create a user
  const user = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@gmail.com",
    },
  });
    console.log("Created user:", user);
}
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
