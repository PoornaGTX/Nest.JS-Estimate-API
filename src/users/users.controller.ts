import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  Patch,
  NotFoundException,
} from '@nestjs/common';
import { createUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { updateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto) //this dto is reposnsible for send the reponse without password
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: createUserDto) {
    return this.UsersService.create(body.email, body.password);
  }

  // @UseInterceptors(new SerializeInterceptor(UserDto))

  @Get('/:id')
  //http://localhost:3000/auth/2
  async findUser(@Param('id') id: string) {
    const user = await this.UsersService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('user not found');
    }

    return user;
  }

  @Get()
  //http://localhost:3000/auth?email=test12@gmail.com
  findAllUsers(@Query('email') email: string) {
    return this.UsersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.UsersService.remove(parseInt(id));
  }

  @Patch('/:id')
  //http://localhost:3000/auth/3
  updateUser(@Param('id') id: string, @Body() body: updateUserDto) {
    return this.UsersService.update(parseInt(id), body);
  }
}
