import { Module } from "@nestjs/common";
import {MongooseModule}from '@nestjs/mongoose'
import { DeliveryOrderSchema } from "./Schema/Order.schema";
import { DeliveryOrdersController } from "./Order.controller";
import { DeliveryOrdersService } from "./Order.service";


@Module({
    imports:[MongooseModule.forFeature([{ name: 'DeliveryOrder', schema: DeliveryOrderSchema }])],
    controllers:[DeliveryOrdersController],
    providers:[DeliveryOrdersService]
})


export class OrderModule{}
