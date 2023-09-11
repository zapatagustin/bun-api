import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { StatusPurchase } from "../dto/purchase.dto";
import { PurchaseProductEntity } from "./purchase-product.entity";

@Entity({ name: "purchase" })
export class PurchaseEntity extends BaseEntity {
  @Column({ type: "enum", enum: StatusPurchase })
  status!: StatusPurchase;

  @Column()
  paymentMethod!: string;

  @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
  @JoinColumn({ name: "customer_id" })
  customer!: CustomerEntity;

  @OneToMany(
    () => PurchaseProductEntity,
    (purchaseProduct) => purchaseProduct.purchase
  )
  purchaseProduct!: PurchaseProductEntity[];
}
