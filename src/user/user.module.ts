import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ProfileModule } from '../profile/profile.module'; // Ajoutez cette ligne

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ProfileModule) // Ajoutez cette ligne
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}