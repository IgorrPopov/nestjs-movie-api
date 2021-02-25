import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';
import {
  MAX_TITLE_LENGTH,
  MIN_TITLE_LENGTH,
  MAX_COUNTRY_LENGTH,
  MIN_COUNTRY_LENGTH,
  MAX_DIRECTOR_LENGTH,
  MIN_DIRECTOR_LENGTH,
  MAX_YEAR,
  MIN_YEAR
} from '../constants/movie.const';

export class CreateMovieDto {
  @IsNotEmpty({ message: 'year should not be empty' })
  @IsInt({ message: 'year should be an integer number' })
  @Max(MAX_YEAR, {
    message: `max year is ${MAX_YEAR}`
  })
  @Min(MIN_YEAR, {
    message: `min year is ${MIN_YEAR}`
  })
  @ApiProperty({ example: 1994 })
  readonly year: number;

  @IsNotEmpty({ message: 'title should not be empty' })
  @IsString({ message: 'title should be a string' })
  @MaxLength(MAX_TITLE_LENGTH, {
    message: `title is to long, max title length is ${MAX_TITLE_LENGTH}`
  })
  @MinLength(MIN_TITLE_LENGTH, {
    message: `title is to short, min title length is ${MIN_TITLE_LENGTH}`
  })
  @ApiProperty({ example: 'The Shawshank Redemption' })
  readonly title: string;

  @IsNotEmpty({ message: 'country should not be empty' })
  @IsString({ message: 'country should be a string' })
  @MaxLength(MAX_COUNTRY_LENGTH, {
    message: `country is to long, max country length is ${MAX_COUNTRY_LENGTH}`
  })
  @MinLength(MIN_COUNTRY_LENGTH, {
    message: `country is to short, min country length is ${MIN_COUNTRY_LENGTH}`
  })
  @ApiProperty({ example: 'USA' })
  readonly country: string;

  @IsNotEmpty({ message: 'director should not be empty' })
  @IsString({ message: 'director should be a string' })
  @MaxLength(MAX_DIRECTOR_LENGTH, {
    message: `director is to long, max director length is ${MAX_DIRECTOR_LENGTH}`
  })
  @MinLength(MIN_DIRECTOR_LENGTH, {
    message: `director is to short, min director length is ${MIN_DIRECTOR_LENGTH}`
  })
  @ApiProperty({ example: 'Frank Darabont' })
  readonly director: string;
}
