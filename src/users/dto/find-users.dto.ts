import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindUsersDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '5QujReZ4R2tHQNPwip66' })
  readonly id: string;

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
