const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const connectSQL = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to DB");
  } catch (error) {
    console.error("SQL connection error:", error);
    process.exit(1);
  }
};

module.exports = { prisma, connectSQL };
