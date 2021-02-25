import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Fred' })
  readonly firstName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Flintstone' })
  readonly lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'user' })
  readonly status: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'mail' })
  readonly gender: string;
}
