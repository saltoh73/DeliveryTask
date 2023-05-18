import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './Order/Order.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }), MongooseModule.forRoot('mongodb://127.0.0.1:27017/DeliveryApp'),OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
