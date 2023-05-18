import { Module } from "@nestjs/common";
import {MongooseModule}from '@nestjs/mongoose'
import { DeliveryOrderSchema } from "./v1/schema/order.schema";
import { DeliveryOrdersController } from "./v1/controller/order.controller";
import { DeliveryOrdersService } from "./v1/service/order.service";


@Module({
    imports:[MongooseModule.forFeature([{ name: 'DeliveryOrders', schema: DeliveryOrderSchema }])],
    controllers:[DeliveryOrdersController],
    providers:[DeliveryOrdersService]
})


export class OrderModule{}
