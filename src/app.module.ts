import { Module, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { UsersModule } from './users/users.module';
import { PubSub } from 'graphql-subscriptions';
import { PubsubModule } from './pubsub/pubsub.module';
import { isValid, parseToken } from './utils/helper-function';
import { AuthModule } from './auth/auth.module';

// const pubSub = new PubSub();

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      context: ({ req, connection }) =>
        connection ? { req: connection.context } : { req },
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: (connectionParams) => {
            console.log('connectionParams>>>>>', connectionParams);
            const authToken = connectionParams.Authorization;
            if (!authToken) {
              throw new UnauthorizedException(`No token `);
            }
            if (!isValid(authToken)) {
              throw new Error('Token is not valid');
            }
            const user = parseToken(authToken);
            return { user };
          },
        },
      },
    }),
    UsersModule,
    PubsubModule,
    AuthModule,
  ],
  providers: [
    AppService,
    AppResolver,
    // { provide: 'PUB_SUB', useValue: pubSub },
  ],
})
export class AppModule {}
