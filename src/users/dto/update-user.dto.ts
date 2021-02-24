import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly gender: string;
}
