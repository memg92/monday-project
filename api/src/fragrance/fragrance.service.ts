import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Fragrance, Prisma } from "@prisma/client";
import { UpdateFragranceDto } from "./fragrance.dto";

@Injectable()
export class FragranceService {
  constructor(private prisma: PrismaService) {}

  // Method to get all fragrances
  async getManyFrances(): Promise<Fragrance[]> {
    return await this.prisma.fragrance.findMany();
  }

  // Method to create a fragrance
  async createFragrance(
    input: Prisma.FragranceCreateInput
  ): Promise<Fragrance> {
    return await this.prisma.fragrance.create({ data: input });
  }

  // Method to update a fragrance
  async updateFragrance(
    id: string,
    data: UpdateFragranceDto
  ): Promise<Fragrance> {
    return await this.prisma.fragrance.update({
      where: { id },
      data,
    });
  }

  // Method to delete a fragrance
  async deleteFragrance(id: string): Promise<Fragrance> {
    return await this.prisma.fragrance.delete({
      where: { id },
    });
  }
}
