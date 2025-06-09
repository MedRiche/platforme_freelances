import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserInput, LoginInput } from './dto/user.input';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

 async createUser(input: CreateUserInput): Promise<User> {
  const { email, password, role } = input;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = this.userRepository.create({ 
    email, 
    password: hashedPassword, 
    role 
  });

  const savedUser = await this.userRepository.save(user);
  
  // Créer un profil vide
  const profile = this.profileRepository.create({
    firstName: '',
    lastName: '',
    user: savedUser
  });
  
await this.profileService.createEmptyProfile(savedUser.id);
  
  return savedUser;
}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['profile'] });
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneOrFail({ where: { id }, relations: ['profile'] });
  }

  async login(input: LoginInput): Promise<string> {
    const { email, password } = input;
    const user = await this.userRepository.findOne({ where: { email }, relations: ['profile'] });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.jwtService.sign({ id: user.id, email: user.email, role: user.role });
  }
}