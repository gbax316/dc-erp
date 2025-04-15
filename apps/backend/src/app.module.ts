import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ChurchModule } from './church/church.module';
import { FinanceModule } from './finance/finance.module';
import { EventModule } from './event/event.module';
import { ContentModule } from './content/content.module';
import { MembersModule } from './members/members.module';
import { FirebaseModule } from './firebase/firebase.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import databaseConfig from './config/database.config';
import firebaseConfig from './config/firebase.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, firebaseConfig, authConfig, appConfig],
    }),
    
    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        const dbConfig = {
          type: 'postgres' as const,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.get<boolean>('database.synchronize'),
          logging: configService.get<boolean>('database.logging'),
        };

        // If DATABASE_URL is provided, use it
        if (configService.get<string>('database.url')) {
          return {
            ...dbConfig,
            url: configService.get<string>('database.url'),
            ssl: configService.get('database.ssl'),
          };
        }

        // Otherwise use individual connection parameters
        return {
          ...dbConfig,
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
        };
      },
      inject: [ConfigService],
    }),
    
    // Firebase
    FirebaseModule,
    
    // Feature modules
    AuthModule,
    UserModule,
    ChurchModule,
    FinanceModule,
    EventModule,
    ContentModule,
    MembersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {} 