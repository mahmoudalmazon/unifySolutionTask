import { injectable } from "tsyringe";
import { IRepository } from "./IRepository";
import { IMagicItem } from "../interfaces/magic-item.interface";
import MagicItem from "../models/MagicItem.model";

@injectable()
export class MagicItemRepository implements IRepository<IMagicItem> {
  async findById(id: string): Promise<IMagicItem | null> {
    return MagicItem.findById(id);
  }

  async create(item: Partial<IMagicItem>): Promise<IMagicItem> {
    return MagicItem.create(item);
  }

  async update(
    id: string,
    item: Partial<IMagicItem>
  ): Promise<IMagicItem | null> {
    return MagicItem.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await MagicItem.findByIdAndDelete(id);
    return result !== null;
  }

  async find(filter: any): Promise<IMagicItem[]> {
    return MagicItem.find(filter);
  }
}
