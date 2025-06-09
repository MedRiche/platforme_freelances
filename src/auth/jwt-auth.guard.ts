import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    console.log('Request headers:', request.headers);
    return request;
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    console.log('Auth Guard - Error:', err);
    console.log('Auth Guard - User:', user);
    console.log('Auth Guard - Info:', info);
    
    if (err || !user) {
      throw err || new UnauthorizedException(info?.message || 'Access denied');
    }
    return user;
  }
}