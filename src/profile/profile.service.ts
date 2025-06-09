// profile.service.ts
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { CreateProfileInput, UpdateProfileInput } from './dto/profile.input';
import { User } from '../user/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createProfile(input: CreateProfileInput, userId: string): Promise<Profile> {
    const user = await this.userRepository.findOneOrFail({ where: { id: userId } });
    const existingProfile = await this.profileRepository.findOne({ where: { user: { id: userId } } });
    if (existingProfile) {
      throw new BadRequestException('User already has a profile');
    }
    const profile = this.profileRepository.create({ ...input, user });
    return this.profileRepository.save(profile);
  }



  async updateProfile(id: string, input: UpdateProfileInput, currentUserId: string, currentUserRole: string): Promise<Profile> {
    const profile = await this.profileRepository.findOneOrFail({ where: { id }, relations: ['user'] });
    if (currentUserId !== profile.user.id && currentUserRole !== 'RH') {
      throw new UnauthorizedException('Not authorized to update this profile');
    }
    Object.assign(profile, input);
    return this.profileRepository.save(profile);
  }

  async deleteProfile(id: string, currentUserId: string, currentUserRole: string): Promise<boolean> {
    const profile = await this.profileRepository.findOneOrFail({ where: { id }, relations: ['user'] });
    if (currentUserId !== profile.user.id && currentUserRole !== 'RH') {
      throw new UnauthorizedException('Not authorized to delete this profile');
    }
    const result = await this.profileRepository.delete(id);
    return result.affected! > 0;
  }

  async findAll(currentUserRole: string): Promise<Profile[]> {
    console.log('Current user role:', currentUserRole);
    console.log('Role type:', typeof currentUserRole);
    
    if (currentUserRole !== 'RH') {
      throw new UnauthorizedException('Only RH can view all profiles');
    }
    return this.profileRepository.find({ relations: ['user'] });
  }

  

  async findOne(id: string, currentUserId: string, currentUserRole: string): Promise<Profile> {
    const profile = await this.profileRepository.findOneOrFail({ where: { id }, relations: ['user'] });
    if (currentUserId !== profile.user.id && currentUserRole !== 'RH') {
      throw new UnauthorizedException('Not authorized to view this profile');
    }
    return profile;
  }

  
}