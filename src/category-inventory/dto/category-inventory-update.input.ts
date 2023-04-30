import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';
@InputType()
export class CategoryInventoryUpdate {
    @Field({ nullable: true })
    @MaxLength(50)
    _id: string;

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    modifiedAt: Date;

}    