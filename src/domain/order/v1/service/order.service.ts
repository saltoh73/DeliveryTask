import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as geolib from 'geolib';
import { DeliveryOrder, OrderStatus } from '../schema/order.schema';

@Injectable()
export class DeliveryOrdersService {
  constructor(@InjectModel(DeliveryOrder.name) private OrderModel: mongoose.Model<DeliveryOrder>) {}

  async createOrder(order: DeliveryOrder): Promise<DeliveryOrder> {
    const createdOrder = new this.OrderModel(order);
    return createdOrder.save();
  }


  
  async getOrders(): Promise<DeliveryOrder[]> {
    return this.OrderModel.find();
  }

  async getOrderById(id: string): Promise<DeliveryOrder> {
    return this.OrderModel.findById(id);
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<DeliveryOrder> {
    return this.OrderModel.findByIdAndUpdate(id, {status}, {new: true});
  }



  async deleteOrder(id: string): Promise<DeliveryOrder> {
    return this.OrderModel.findByIdAndDelete(id);
  }



  async getNearestOrder(latitude: number, longitude: number , maxDistanceInMeter:number): Promise<DeliveryOrder> {
    const findOptions  = {
      status: OrderStatus.PENDING ,
      location: {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [ longitude , latitude ]
          },
          $maxDistance: maxDistanceInMeter
        }
      },
    };

    return this.OrderModel.find(findOptions).lean();
  }
}
