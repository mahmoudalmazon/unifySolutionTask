import { injectable } from "tsyringe";
import { IRepository } from "./IRepository";
import { IMagicMover } from "../interfaces/magic-mover.interface";
import MagicMover from "../models/MagicMover.model";

@injectable()
export class MagicMoverRepository implements IRepository<IMagicMover> {
  async findById(id: string): Promise<IMagicMover | null> {
    return MagicMover.findById(id);
  }

  async create(item: Partial<IMagicMover>): Promise<IMagicMover> {
    return MagicMover.create(item);
  }

  async update(
    id: string,
    item: Partial<IMagicMover>
  ): Promise<IMagicMover | null> {
    return MagicMover.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await MagicMover.findByIdAndDelete(id);
    return result !== null;
  }

  async find(filter: any): Promise<IMagicMover[]> {
    return MagicMover.find(filter);
  }
}
