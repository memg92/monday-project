import { Module } from "@nestjs/common";
import { FragranceController } from "./fragrance/fragrance.controller";
import { FragranceService } from "./fragrance/fragrance.service";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [],
  controllers: [FragranceController],
  providers: [FragranceService, PrismaService],
})
export class AppModule {}
