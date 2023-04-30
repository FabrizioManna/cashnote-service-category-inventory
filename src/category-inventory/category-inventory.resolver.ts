import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { CategoryInventory } from './entities/category-inventory.entity';
import { CategoryInventoryService } from './category-inventory.service';
import { CategoryInventoryFindInput } from './dto/category-inventory-find.input';
import { CategoryInventoryInput } from './dto/category-inventory.input';
import { CategoryInventoryUpdate } from './dto/category-inventory-update.input';
import { NotFoundException } from '@nestjs/common';
@Resolver((of) => CategoryInventory)
export class CategoryInventoryResolver {
  constructor(private categoryInventoryService: CategoryInventoryService) {}

  @Query((type) => [CategoryInventory])
  async getAllCategoryInventory() {
    return this.categoryInventoryService.getCategoryInventorys();
  }

  @Mutation((returns) => CategoryInventory)
  createCategoryInventory(
    @Args('categoryInventoryInput')
    categoryInventoryInput: CategoryInventoryInput,
  ): Promise<CategoryInventory> {
    return this.categoryInventoryService.createCategoryInventory(
      categoryInventoryInput,
    );
  }

  @Query((returns) => [CategoryInventory])
  async findCategoryInventory(
    @Args('categoryInventoryFindInput')
    categoryInventoryFindInput: CategoryInventoryFindInput,
  ): Promise<CategoryInventory[]> {
    return await this.categoryInventoryService.findCategoryInventoryByFilters(
      categoryInventoryFindInput,
    );
  }

  @Mutation((returns) => CategoryInventory)
  async updateCategoryInventory(
    @Args('id') id: string,
    @Args('data') data: CategoryInventoryUpdate,
  ): Promise<CategoryInventory> {
    const cateinv = await this.categoryInventoryService.getCategoryInventoryById(id);
    if (!cateinv) {
      throw new NotFoundException(`License with ID ${id} not found`);
    }
    const updatedcateinv =
      await this.categoryInventoryService.updateCategoryInventory(id, data);
    return updatedcateinv;
  }

  @Mutation((returns) => Boolean)
  async deleteCategoryInventory(@Args('id') _id: string): Promise<boolean> {
    const cain = await this.categoryInventoryService.getCategoryInventoryById(
      _id,
    );


    if (!cain) {
      throw new NotFoundException(`License with ID ${_id} not found`);
    }

    return await this.categoryInventoryService.deleteCategoryInventory(_id);
  }
}