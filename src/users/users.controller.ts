import { Controller, Post, Body } from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: createUserDto) {
    const user = this.UsersService.create(body.email, body.password);

    return user;
  }
}
