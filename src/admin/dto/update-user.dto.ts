import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength, IsNumber } from 'class-validator';

export class UpdateUserDto {
  @IsNumber()
  id: number

  @IsPhoneNumber()
  phone?: string;

  @IsEmail()
  email?: string;

  @IsNotEmpty()
  username?: string;

  @MinLength(8)
  password?: string;
}
