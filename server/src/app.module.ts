import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CacheService } from '@infrastructure/cache';
import { setEnvironment } from '@infrastructure/environments';
import { UsersModule } from '@infrastructure/ioc/users.module';
import { ProductsModule } from '@infrastructure/ioc/products.module';
import { OrdersModule } from '@infrastructure/ioc/orders.module';
import { HealthController } from '@infrastructure/terminus/index';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    OrdersModule,
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: setEnvironment(),
    }),
    TypeOrmModule.forRoot(),
    CacheModule.registerAsync({
      useClass: CacheService,
    }),
    TerminusModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
