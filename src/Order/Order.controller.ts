import { Controller, Get, Post, Patch, Param, Body, ParseFloatPipe, ParseIntPipe, Query, Delete, UseGuards } from '@nestjs/common';
import { DeliveryOrdersService } from './Order.service';
import { DeliveryOrder, OrderStatus } from './Schema/Order.schema';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('orders')
export class DeliveryOrdersController {
  constructor(private deliveryOrdersService: DeliveryOrdersService) {}

  @Post()
  async createOrder(@Body() order: DeliveryOrder): Promise<DeliveryOrder> {
    return await this.deliveryOrdersService.createOrder(order);
  }

  @Get()
 async getOrders(): Promise<DeliveryOrder[]> {
    return await this.deliveryOrdersService.getOrders();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getOrderById(@Param('id') id: string): Promise<DeliveryOrder> {
     return this.deliveryOrdersService.getOrderById(id);
  }

  @UseGuards(JwtGuard)

  @Patch(':id/status')
  async updateOrderStatus(@Param('id') id: string, @Body('status') status: OrderStatus): Promise<DeliveryOrder> {
    return await this.deliveryOrdersService.updateOrderStatus(id, status);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteOrderDelivery(@Param('id') id: string): Promise<DeliveryOrder> {
    return await this.deliveryOrdersService.deleteOrder(id)
  }

  @Get('youDeliverThis')
  async getNearestOrder(
    @Query('latitude', new ParseFloatPipe()) latitude: number,
    @Query('longitude', new ParseFloatPipe()) longitude: number
  ): Promise<DeliveryOrder> {
    return await this.deliveryOrdersService.getNearestOrder(latitude, longitude);
  }
}
