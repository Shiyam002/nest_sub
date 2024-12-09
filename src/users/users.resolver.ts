import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './user.model';
import { Inject, UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { CreateUserInput } from './dto/create-user.input';
import { GqlAuthGuard } from 'src/auth/auth.gurad';

@Resolver('user')
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    @Inject('PUB_SUB') private pubsub: PubSub,
  ) {}

  @Query(() => [User], { name: 'users' })
  async users() {
    return await this.usersService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = await this.usersService.createUser(createUserInput);
    console.log('controoller user>>>', user);
    return user;
  }

  // @UseGuards(GqlAuthGuard)
  @Subscription(() => User, {
    resolve: (payload) => payload.userCreated,
  })
  async userCreated() {
    return this.pubsub.asyncIterator('userCreated');
  }
  // @Query(() => User, { name: 'user' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.findOne(id);
  // }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }
}
