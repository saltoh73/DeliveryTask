import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  DELIVERED = 'delivered',
  CANCELED = 'canceled',
}

@Schema()
export class DeliveryOrder  {
  @Prop({ required: true })
  customerName: string;

  @Prop({ type: [{ type: String }] })
  items: string[];

  @Prop({ required: true })
  pickupLocation: string;

  @Prop({ required: true })
  deliveryLocation: string;

  @Prop({ default: OrderStatus.PENDING })
  status: OrderStatus;
}

export const DeliveryOrderSchema = SchemaFactory.createForClass(DeliveryOrder);
