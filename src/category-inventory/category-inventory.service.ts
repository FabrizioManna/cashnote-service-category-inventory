import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions, Like, FindManyOptions } from 'typeorm';
import { CategoryInventory } from './entities/category-inventory.entity';
import { CategoryInventoryFindInput } from './dto/category-inventory-find.input';
@Injectable()
/**
 * Class for comunication with db
 * this is used for CRUD operation
 * contain business logic
 *
 * @author Manna Fabrizio <mannafabrizio83@gmail.com>
 *
 */
export class CategoryInventoryService {
  constructor(
    @InjectRepository(CategoryInventory)
    private repositoryCategoryInventory: Repository<CategoryInventory>,
  ) {}

  /**
   * Function getCategoryInventory
   * return all category utilized on inventory
   *
   * @returns CategoryInventory[]
   *
   */
  async getCategoryInventory(): Promise<CategoryInventory[]> {
    return await this.repositoryCategoryInventory.find({
      where: {
        active_status: true,
      },
    });
  }

  /**
   *
   * Function findCategoryInventoryByFilter
   * return an array o single category filtered
   *
   * @param {CategoryInventoryFindInput} categoryInventoryFindInput
   * @return CategoryInventory[]
   *
   */
  async findCategoryInventoryByFilter(
    categoryInventoryFindInput: CategoryInventoryFindInput,
  ): Promise<CategoryInventory[]> {
    const option: FindManyOptions<CategoryInventory> = {
      where: {},
    };

    if (categoryInventoryFindInput._id) {
      option.where = {
        ...option.where,
        _id: categoryInventoryFindInput._id,
      };
    }

    if (categoryInventoryFindInput.createdAt) {
      option.where = {
        ...option.where,
        createdAt: categoryInventoryFindInput.createdAt,
      };
    }

    if (categoryInventoryFindInput.description) {
      option.where = {
        ...option.where,
        description: categoryInventoryFindInput.description,
      };
    }

    if (categoryInventoryFindInput.modifiedAt) {
      option.where = {
        ...option.where,
        modifiedAt: categoryInventoryFindInput.modifiedAt,
      };
    }

    return this.repositoryCategoryInventory.find(option);
  }
}
