import { createParamDecorator, ExecutionContext, BadRequestException } from '@nestjs/common';
import * as rawBody from 'raw-body';

export const PlainBody = createParamDecorator(async (data, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  if (!req.readable) {
    throw new BadRequestException('Invalid body');
  }

  const body = (await rawBody(req)).toString('utf8').trim();

  return body;
});
