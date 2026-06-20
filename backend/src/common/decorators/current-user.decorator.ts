import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';

type CurrentUserPayload = {
  id: number;
  email: string;
};

type RequestWithUser = Request & {
  user: CurrentUserPayload;
};

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<RequestWithUser>();

  return request.user;
});
