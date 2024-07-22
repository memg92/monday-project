import { IsString, IsOptional, IsNotEmpty } from "class-validator";
import { FragranceCategory } from "@prisma/client";

export class CreateFragranceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: FragranceCategory;

  @IsString()
  @IsNotEmpty()
  image_url: string;

  @IsOptional()
  created_at?: Date;
}

export class UpdateFragranceDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  category?: FragranceCategory;

  @IsString()
  @IsOptional()
  image_url?: string;
}
