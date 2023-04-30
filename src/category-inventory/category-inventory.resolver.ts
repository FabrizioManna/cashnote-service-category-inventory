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
<<<<<<< HEAD
    const cateinv = await this.categoryInventoryService.getCategoryInventoryById(id);
=======
    const cateinv = await this.categoryInventoryService.getCategoryInventoyById(id);
>>>>>>> 17777f6ed1e81cc2f0ffec0b466fbcc0c74cbd02
    if (!cateinv) {
      throw new NotFoundException(`License with ID ${id} not found`);
    }
    const updatedcateinv =
      await this.categoryInventoryService.updateCategoryInventory(id, data);
    return updatedcateinv;
  }

  @Mutation((returns) => Boolean)
  async deleteCategoryInventory(@Args('id') _id: string): Promise<boolean> {
<<<<<<< HEAD
    const cain = await this.categoryInventoryService.getCategoryInventoryById(
      _id,
    );

    if (!cain) {
=======
    const license = await this.categoryInventoryService.getCategoryInventoyById(
      _id,
    );

    if (!license) {
>>>>>>> 17777f6ed1e81cc2f0ffec0b466fbcc0c74cbd02
      throw new NotFoundException(`License with ID ${_id} not found`);
    }

    return await this.categoryInventoryService.deleteCategoryInventory(_id);
  }
}