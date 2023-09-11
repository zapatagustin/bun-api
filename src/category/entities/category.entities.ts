import { BaseEntity, Column, Entity, OneToMany } from "typeorm";
import { ProductEntity } from "../../product/entities/product.entities";
import { ColorBadge } from "../dto/category.dto";

@Entity({ name: "category" })
export class CategoryEntity extends BaseEntity {
  @Column()
  categoryName!: string

  @Column({ type: "enum", enum: ColorBadge, default: ColorBadge.PRIMARY })
  colorBadge?: ColorBadge

  @OneToMany(() => ProductEntity, (product) => product.category)
  products!: ProductEntity
}
