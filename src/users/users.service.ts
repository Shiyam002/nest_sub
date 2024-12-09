import { Inject, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class UsersService {
  private users = [];

  constructor(
    private readonly prisma: PrismaService,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}
  async findAll() {
    return await this.prisma.user.findMany();
  }
  async createUser(user: CreateUserInput) {
    const createdUser = await this.prisma.user.create({
      data: {
        name: user.name,
        age: user.age,
      },
    });
    console.log('createdUser>>>>', createdUser);
    const payload = { userCreated: createdUser };
    await this.pubSub.publish('userCreated', payload);
    return createdUser;
  }
}
