import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile, User])],
  providers: [ProfileService, ProfileResolver],
  exports: [ProfileService],
})
export class ProfileModule {}