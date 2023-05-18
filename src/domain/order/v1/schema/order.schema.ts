import { Prop, raw,  Schema, SchemaFactory } from '@nestjs/mongoose';

/*

customer name, items to be
shipped, pickup location, delivery location and status.
 */
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

  // TODO list of object {id , name , price , quantity}
  @Prop({ type: [{ type: String }] })
  items: string[];

  @Prop(
      raw({
        type: Object,
        properties: {
          type: {
            type: String,
          },
          coordinates: [],
        },
        index: '2dsphere',
      }),
  )
  location: any;

  @Prop({ default: OrderStatus.PENDING })
  status: OrderStatus;
}

export const DeliveryOrderSchema = SchemaFactory.createForClass(DeliveryOrder);
