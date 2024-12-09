import { Module } from '@nestjs/common';
import { PubsubService } from './pubsub.service';
import { PubsubResolver } from './pubsub.resolver';
import { PubSub } from 'graphql-subscriptions';

const pubSubProvider = {
  provide: 'PUB_SUB',
  useValue: new PubSub(),
};

@Module({
  providers: [PubsubResolver, PubsubService, pubSubProvider],
  exports: [pubSubProvider],
})
export class PubsubModule {}
