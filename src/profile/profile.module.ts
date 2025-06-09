import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    forwardRef(() => UserModule) // Ajoutez cette ligne
  ],
  providers: [ProfileService, ProfileResolver],
  exports: [ProfileService], // Ajoutez cette ligne
})
export class ProfileModule {}