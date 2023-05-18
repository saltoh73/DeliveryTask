import {Controller, Get, Post, Patch, Param, Body, ParseFloatPipe, Query, Delete, UseGuards} from '@nestjs/common';
import {DeliveryOrdersService} from '../service/order.service';
import {DeliveryOrder, OrderStatus} from '../schema/order.schema';
import {DriverMustBeAuthorizedGuard} from "../../../../core/http/guard/driver-must-be-authorized-guard.service";

@Controller('/api/v1/orders')
export class DeliveryOrdersController {
    constructor(private deliveryOrdersService: DeliveryOrdersService) {
    }

    @Post()
    async createOrder(@Body() order: DeliveryOrder): Promise<DeliveryOrder> {
        return await this.deliveryOrdersService.createOrder(order);
    }

    @Get()
    async getOrders(): Promise<DeliveryOrder[]> {
        return await this.deliveryOrdersService.getOrders();
    }

    @UseGuards(DriverMustBeAuthorizedGuard)
    @Get(':id')
    async getOrderById(@Param('id') id: string): Promise<DeliveryOrder> {
        return this.deliveryOrdersService.getOrderById(id);
    }

    @UseGuards(DriverMustBeAuthorizedGuard)
    @Patch(':id/status')
    async updateOrderStatus(@Param('id') id: string, @Body('status') status: OrderStatus): Promise<DeliveryOrder> {
        return await this.deliveryOrdersService.updateOrderStatus(id, status);
    }

    @UseGuards(DriverMustBeAuthorizedGuard)
    @Delete(':id')
    async deleteOrderDelivery(@Param('id') id: string): Promise<DeliveryOrder> {
        return await this.deliveryOrdersService.deleteOrder(id)
    }

    @UseGuards(DriverMustBeAuthorizedGuard)
    @Get('/you-deliver-this')  //  I wrote it like this to respect the principle RESTFUL Apis
    
    async getNearestOrder(
        @Query('latitude', ParseFloatPipe) latitude: number,
        @Query('longitude', ParseFloatPipe) longitude: number,
        @Query('maxDistanceInMeter', ParseFloatPipe) maxDistanceInMeter: number
    ): Promise<DeliveryOrder> {
        return await this.deliveryOrdersService.getNearestOrder(latitude, longitude, maxDistanceInMeter);
    }
}
