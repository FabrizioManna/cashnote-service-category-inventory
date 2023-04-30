import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
@InputType()
export class CategoryInventoryUpdate {
<<<<<<< HEAD
    @Field({ nullable: true })
    @MaxLength(50)
    _id: string;

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    modifiedAt: Date;

=======
    @Field()
    @MaxLength(50)
  _id: string;

  @Field()
  description: string;

  @Field()
  modifiedAt?: Date;
>>>>>>> 17777f6ed1e81cc2f0ffec0b466fbcc0c74cbd02
}    