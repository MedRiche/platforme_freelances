import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserInput, LoginInput } from './dto/user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.createUser(input);
  }

  @Mutation(() => String)
  async login(@Args('input') input: LoginInput): Promise<string> {
    return this.userService.login(input);
  }
   @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
@Query(() => User)
@UseGuards(JwtAuthGuard)
async me(@Context('req') req): Promise<User> {
  return this.userService.findOne(req.user.id);
}


  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async users(@Context('req') req): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async user(@Args('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
}