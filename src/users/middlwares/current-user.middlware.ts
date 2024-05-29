import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';

export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private UsersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.UsersService.findOne(userId);

      //@ts-ignore
      req.currentUser = user;
    }

    next();
  }
}
