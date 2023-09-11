import { BaseEntity, Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { PurchaseEntity } from "./purchase.entities";
import { ProductEntity } from "../../product/entities/product.entities";

@Entity({ name: "purchases_products" })
export class PurchaseProductEntity extends BaseEntity {
  @Column()
  quantityProduct!: number

  @Column()
  totalPrice!: number

  @ManyToOne(() => PurchaseEntity, (purchase) => purchase.purchaseProduct)
  @JoinColumn({ name: "purchase_id" })
  purchase!: PurchaseEntity

  @ManyToOne(() => ProductEntity, (product) => product.purchaseProduct)
  @JoinColumn({ name: "product_id" })
  product!: ProductEntity
}
