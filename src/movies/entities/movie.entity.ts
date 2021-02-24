import { ApiProperty } from '@nestjs/swagger';

export class Movie {
  @ApiProperty({ example: '5QujReZ4R2tHQNPwip66' })
  public readonly id?: string;

  @ApiProperty({ example: 1994 })
  public readonly year?: number;

  @ApiProperty({ example: 'The Shawshank Redemption' })
  public readonly title?: string;

  @ApiProperty({ example: 'USA' })
  public readonly country?: string;

  @ApiProperty({ example: 'Frank Darabont' })
  public readonly director?: string;
}
