import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Fred' })
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Flintstone' })
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'user' })
  readonly status: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'mail' })
  readonly gender: string;
}