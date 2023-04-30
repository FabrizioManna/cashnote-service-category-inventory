import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
@InputType()
export class CategoryInventoryInput {
  @Field()
  @MaxLength(50)
  _id: string;

  @Field()
  description: string;

}