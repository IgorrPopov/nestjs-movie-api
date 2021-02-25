import { ApiProperty } from "@nestjs/swagger";

export class User {
  @ApiProperty({ example: '5QujReZ4R2tHQNPwip66' })
  readonly id: string;

  @ApiProperty({ example: 'Fred' })
  readonly firstName: string;

  @ApiProperty({ example: 'Flintstone' })
  readonly lastName: string;

  @ApiProperty({ example: 'user' })
  readonly status: string;

  @ApiProperty({ example: 'male' })
  readonly gender: string;
}

