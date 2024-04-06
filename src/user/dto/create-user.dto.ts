import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsPhoneNumber()
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @MinLength(8)
  password: string;
}
