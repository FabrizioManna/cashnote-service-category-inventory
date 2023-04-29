import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class CategoryInventoryFindInput {

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  modifiedAt: Date;
}
