import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { Role } from '../../enums/role.enum';
import { CreateProfileInput } from '../../profile/dto/profile.input';

@InputType()
export class CreateUserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Field(() => Role)
  @IsEnum(Role)
  role: Role;

  @Field(() => CreateProfileInput, { nullable: true })
  profile?: CreateProfileInput
}

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;
}