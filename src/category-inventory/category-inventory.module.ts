import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryInventory } from './entities/category-inventory.entity';
import { CategoryInventoryService } from './category-inventory.service';
import { CategoryInventoryResolver } from './category-inventory.resolver';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryInventory])],
    providers: [CategoryInventoryService, CategoryInventoryResolver],
})
export class CategoryInventoryModule {}
