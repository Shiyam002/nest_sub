import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { PubsubModule } from 'src/pubsub/pubsub.module';

@Module({
  providers: [UsersResolver, UsersService, PrismaService],
  imports: [PubsubModule],
})
export class UsersModule {}
