import { Module } from "@nestjs/common";
import { AppController } from "./fragrance.controller";
import { AppService } from "./fragrance.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
