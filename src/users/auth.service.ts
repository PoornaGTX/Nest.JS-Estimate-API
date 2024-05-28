import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { randomBytes, scrypt as _scrypt } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private UsersService: UsersService) {}

  async signup(email: string, password: string) {
    //see if email is use

    const users = await this.UsersService.find(email);

    if (users.length) {
      throw new BadRequestException('email is use');
    }

    //hash the password
    //generate solt
    const salt =
      randomBytes(8).toString(
        'hex',
      ); /*randomBytes(8) thats mean inside the buffer there are 8 byites, 
    then every 1 biye of data have two chartores when we convert to hex
    then solt is 16 charatoes*/

    //hash the solt and password
    const hash = (await scrypt(password, salt, 32)) as Buffer; //hash is 32 chaaters

    //join the hasehd result and salt together
    const result = salt + '.' + hash.toString('hex');

    //create new user and save it
    const user = await this.UsersService.create(email, result);

    //return user
    return user;
  }

  async signin(email: string, password: string) {
    const [user] = await this.UsersService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
