import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../user/user.entity';

@ObjectType()
@Entity()
export class Profile {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field(() => [String])
  @Column('text', { array: true, default: '{}' })
  skills: string[];

  @Field(() => [String])
  @Column('text', { array: true, default: '{}' })
  professionalLinks: string[];

  @Field(() => User)
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;

    @Field({ defaultValue: false }) // <- nouveau champ exposé à GraphQL
  @Column({ default: false })     // <- stocké dans la base
  accepted: boolean;
}