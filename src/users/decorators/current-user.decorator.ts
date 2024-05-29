import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    //ExecutionContext - allow any other communication prorcols like http, websocket, graphql
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
