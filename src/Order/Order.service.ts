import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as geolib from 'geolib';
import { DeliveryOrder, OrderStatus } from './Schema/Order.schema';

@Injectable()
export class DeliveryOrdersService {
  constructor(@InjectModel(DeliveryOrder.name) private OrderModel: mongoose.Model<DeliveryOrder>) {}

  async createOrder(order: DeliveryOrder): Promise<DeliveryOrder> {
    const createdOrder = new this.OrderModel(order);
    return createdOrder.save();
  }


  
  async getOrders(): Promise<DeliveryOrder[]> {
    return await this.OrderModel.find();
  }

  async getOrderById(id: string): Promise<DeliveryOrder> {
    return await this.OrderModel.findById(id);
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<DeliveryOrder> {
    return await this.OrderModel.findByIdAndUpdate(id, { status }, { new: true });
  }



  async deleteOrder(id: string): Promise<DeliveryOrder> {
    return await this.OrderModel.findByIdAndDelete(id);
  }



  async getNearestOrder(latitude: number, longitude: number): Promise<DeliveryOrder> {
    const orders = await this.OrderModel.find({ status: OrderStatus.PENDING });
    let nearestOrder: DeliveryOrder = null;
    let minDistance = Infinity;
    for (const order of orders) {
      const distance = geolib.getDistance(
        { latitude, longitude },
        { latitude: latitude, longitude: longitude }
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestOrder = order;
      }
    }
    return nearestOrder;
  }
}
