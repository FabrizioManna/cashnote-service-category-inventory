import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CategoryInventoryInput {
  @Field({ maxLength: 50 })
  _id: string;

  @Field()
  description: string;

}