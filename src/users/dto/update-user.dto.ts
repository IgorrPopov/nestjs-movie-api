import {
  IsNotEmpty,
  IsString
} from 'class-validator';


export class UpdateUserDto {

  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;

  @IsNotEmpty()
  @IsString()
  readonly status: string;

  @IsNotEmpty()
  @IsString()
  readonly gender: string;
}