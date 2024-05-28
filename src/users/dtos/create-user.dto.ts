import { IsEmail, IsString, MinLength } from 'class-validator';

export class createUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5, { message: 'password should be atleast 5 charcters' })
  password: string;
}
