import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, PrimaryColumn, BeforeUpdate } from 'typeorm';
@Entity()
@ObjectType()
export class CategoryInventory {
    @PrimaryColumn({ 
        type: 'varchar',
        unique: true,
    })
    @Field((type) => String)
    _id: string;

    @Column()
    @Field()
    description: string;

    @Column({ default: true })
    @Field()
    active_status: boolean;

    @Column({ type: 'integer' })
    @Field()
    createdAt: Date;

    @Column({ type: 'integer' })
    @Field()
    modifiedAt: Date;

}