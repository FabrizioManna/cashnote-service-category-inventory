import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindOneOptions, Like, FindManyOptions } from 'typeorm';
import { CategoryInventory } from './entities/category-inventory.entity';
import { CategoryInventoryFindInput } from './dto/category-inventory-find.input';
import { CategoryInventoryInput } from './dto/category-inventory.input';
import { CategoryInventoryUpdate } from './dto/category-inventory-update.input';
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
  async getCategoryInventorys(): Promise<CategoryInventory[]> {
    return await this.repositoryCategoryInventory.find({
      where: {
        active_status: true,
      },
    });
  }

  /**
   *
   * Function findCategoryInventoryByFilters
   * return an array o single category filtered
   *
   * @param {CategoryInventoryFindInput} categoryInventoryFindInput
   * @return CategoryInventory[]
   *
   */
  async findCategoryInventoryByFilters(
    categoryInventoryFindInput: CategoryInventoryFindInput,
  ): Promise<CategoryInventory[]> {
    const option: FindManyOptions<CategoryInventory> = {
      where: {},
    };


    if (categoryInventoryFindInput.createdAt) {
      option.where = {
        ...option.where,
        createdAt: categoryInventoryFindInput.createdAt,
      };
    }

    if (categoryInventoryFindInput.description) {
      option.where = {
        ...option.where,
        description: Like(`%${categoryInventoryFindInput.description}%`),
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

  /**
     * 
     *  Function getCategoryInventoyById
     *  return Category by id
     * 
     *  @param _id
     * 
     *  @return CategoryInventory
     * 
     */
    async getCategoryInventoryById(_id: string): Promise<CategoryInventory> {
        const options: FindOneOptions<CategoryInventory> = { where: { _id, active_status: true } };
        return await this.repositoryCategoryInventory.findOne(options);
    }

    /**
     * 
     *  Function createCategoryInventory
     *  insert a Category in db
     * 
     *  @param CategoryInventoryInput
     * 
     *  @return CategoryInventory
     *  
     */
  async createCategoryInventory(
    categoryInventoryInput: CategoryInventoryInput,
  ): Promise<CategoryInventory> {
        const options: FindOneOptions<CategoryInventory> = { where: { _id: categoryInventoryInput._id } };
        const check = await this.repositoryCategoryInventory.findOne(options);
        
        if(check) throw new Error("Category ID already exists.");

        let cain = this.repositoryCategoryInventory.create(categoryInventoryInput);
        cain.createdAt = new Date(Date.now());
        cain.modifiedAt = new Date(Date.now());
        return await this.repositoryCategoryInventory.save(cain);
    }

    /**
     * 
     *  Function updateInventory
     *  function for update inventory data
     *  
     *  @param _id
     *  @param InventoryInputUpdateData 
     *  
     *  @return Inventory
     * 
     */
  async updateCategoryInventory(
    _id: string,
    categoryInventoryUpdate: CategoryInventoryUpdate,
  ): Promise<CategoryInventory> {
        let data: CategoryInventoryUpdate = categoryInventoryUpdate;
        data.modifiedAt = new Date(Date.now());
        await this.repositoryCategoryInventory.update(_id, data);
        return this.repositoryCategoryInventory.findOne({ where: { _id: data._id } });
    } 

    /**
     * 
     *  Function deleteCategoryInventory 
     *  for delete Category from db
     * 
     *  @param _id
     * 
     *  @return boolean
     * 
     */
    async deleteCategoryInventory(_id: string): Promise<boolean> {
      const cain = await this.repositoryCategoryInventory.findOne({
        where: { _id },
      });

      if (!cain) throw new Error(`Inventory with ID ${_id} not found`);

      const result = await this.repositoryCategoryInventory.update(_id, {
        active_status: false,
        modifiedAt: new Date(Date.now()),
      });

      return result.affected > 0;
    }


}
