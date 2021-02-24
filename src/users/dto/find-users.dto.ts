import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindUsersDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly id: string;

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
