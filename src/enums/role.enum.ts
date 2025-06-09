import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  FREELANCER = 'FREELANCER',
  RH = 'RH',
}

registerEnumType(Role, {
  name: 'Role',
});
