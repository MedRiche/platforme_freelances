

// profile.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './profile.entity';
import { CreateProfileInput, UpdateProfileInput } from './dto/profile.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';


@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private profileService: ProfileService) {}

  @Mutation(() => Profile)
  @UseGuards(JwtAuthGuard)
  async createProfile(
    @Args('input') input: CreateProfileInput,
    @CurrentUser() user: any,
  ): Promise<Profile> {
    return this.profileService.createProfile(input, user.id);
  }

@Mutation(() => Profile)
@UseGuards(JwtAuthGuard)
async updateProfile(
  @Args('id') id: string,
  @Args('input') input: UpdateProfileInput,
  @CurrentUser() user: any,
): Promise<Profile> {
  return this.profileService.updateProfile(id, input, user.id, user.role);
}

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteProfile(
    @Args('id') id: string, 
    @CurrentUser() user: any
  ): Promise<boolean> {
    console.log('User from resolver:', user);
    return this.profileService.deleteProfile(id, user.id, user.role);
  }

  @Query(() => [Profile])
  @UseGuards(JwtAuthGuard)
  async profiles(@CurrentUser() user: any): Promise<Profile[]> {
    console.log('User role from resolver:', user.role);
    return this.profileService.findAll(user.role);
  }


  @Query(() => Profile)
  @UseGuards(JwtAuthGuard)
  async profile(
    @Args('id') id: string, 
    @CurrentUser() user: any
  ): Promise<Profile> {
    return this.profileService.findOne(id, user.id, user.role);
  }


}

