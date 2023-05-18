import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import {OrderModule} from "./domain/order/order.module";
import {AuthModule} from "./domain/auth/auth.module";

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
    }),
        MongooseModule.forRoot('mongodb://127.0.0.1:27017/DeliveryApp'),
        OrderModule,AuthModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
