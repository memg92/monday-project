import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { Fragrance } from "@prisma/client";
import { FragranceService } from "./fragrance.service";
import { CreateFragranceDto, UpdateFragranceDto } from "./fragrance.dto";

@Controller("fragrances")
export class FragranceController {
  constructor(private readonly appService: FragranceService) {}

  @Get()
  async getFragrances(): Promise<Fragrance[]> {
    return this.appService.getManyFrances();
  }

  @Post()
  @HttpCode(201)
  async createFragrance(
    @Body() createInput: CreateFragranceDto
  ): Promise<Fragrance> {
    return this.appService.createFragrance(createInput);
  }

  @Patch(":id")
  async updateFragrance(
    @Param("id") id: string,
    @Body() updateFragranceDto: UpdateFragranceDto
  ): Promise<Fragrance> {
    return this.appService.updateFragrance(id, updateFragranceDto);
  }

  @Delete(":id")
  async deleteFragrance(@Param("id") id: string): Promise<Fragrance> {
    return this.appService.deleteFragrance(id);
  }
}
