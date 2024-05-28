import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class updateUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'password should be atleast 5 charcters' })
  password: string;
}
