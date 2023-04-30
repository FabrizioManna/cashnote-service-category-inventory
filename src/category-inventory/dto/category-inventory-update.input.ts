import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
@InputType()
export class CategoryInventoryUpdate {
    @Field()
    @MaxLength(50)
  _id: string;

  @Field()
  description: string;

  @Field()
  modifiedAt?: Date;
}    