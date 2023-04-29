import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryInventoryModule } from './category-inventory/category-inventory.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule, ApolloDriverConfig } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { CategoryInventory } from './category-inventory/entities/category-inventory.entity';
@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [CategoryInventory],
      synchronize: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: process.env.GRAPHQL_PLAY === 'true' ? true : false || true,
    }),

    CategoryInventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
