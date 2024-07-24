import { NestFactory } from "@nestjs/core";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { AppModule } from "./app.module";

async function bootstrap() {
  // Load environment variables
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  // Initialize Prisma Client
  const prisma = new PrismaClient();

  // Test the database connection
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  });

  const PORT = 3000;
  await app.listen(PORT);
  console.log(`Application is running on port: ${PORT}`);
}

bootstrap();
