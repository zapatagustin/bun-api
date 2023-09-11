import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { UserEntity } from "../../user/entities/user.entity";

export class CustomerDTO extends BaseDTO {
  @IsNotEmpty()
  adress!: string

  @IsNotEmpty()
  dni!: number

  @IsNotEmpty()
  user!: UserEntity
}
