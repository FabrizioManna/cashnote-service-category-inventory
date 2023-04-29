import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CategoryInventoryUpdate {
    @Field({ maxLength: 50 })
  _id: string;

  @Field()
  description: string;
}    