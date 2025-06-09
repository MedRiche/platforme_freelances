// jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key', // Make sure this matches your auth service
    });
  }

  async validate(payload: any) {
    console.log('JWT Payload received:', payload);
    
    // The payload structure from your JWT token
    const user = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
    
    console.log('User object created:', user);
    return user;
  }
}