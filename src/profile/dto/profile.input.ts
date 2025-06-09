import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsArray, IsOptional } from 'class-validator';

@InputType()
export class CreateProfileInput {
  @Field()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsNotEmpty()
  lastName: string;

  @Field(() => [String])
  @IsArray()
  skills: string[];

  @Field(() => [String])
  @IsArray()
  professionalLinks: string[];
}

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  @IsOptional()
  firstName?: string;

  @Field({ nullable: true })
  @IsOptional()
  lastName?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  skills?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  professionalLinks?: string[];
}