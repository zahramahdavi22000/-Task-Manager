import { IsEmail, IsNumber, IsNumberString, IsPhoneNumber, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsPhoneNumber()
  phone?: string;

  @IsEmail()
  email?: string;

  @MinLength(8)
  password?: string;
}
