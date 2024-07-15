import ActivityLog from "../models/ActivityLog.model";
import { IActivityLog } from "../interfaces/activitly-log.interface";
import { IRepository } from "./IRepository";
import { injectable } from "tsyringe";

@injectable()
export class ActivityLogRepository implements IRepository<IActivityLog> {
  async findById(id: string): Promise<IActivityLog | null> {
    return ActivityLog.findById(id);
  }

  async create(item: Partial<IActivityLog>): Promise<IActivityLog> {
    return ActivityLog.create(item);
  }

  async update(
    id: string,
    item: Partial<IActivityLog>
  ): Promise<IActivityLog | null> {
    return ActivityLog.findByIdAndUpdate(id, item, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await ActivityLog.findByIdAndDelete(id);
    return result !== null;
  }

  async find(filter: any): Promise<IActivityLog[]> {
    return ActivityLog.find(filter);
  }

  async aggregateTopMovers() {
    return ActivityLog.aggregate([
      { $match: { action: "on-mission" } },
      { $group: { _id: "$magicMover", missionCount: { $sum: 1 } } },
      { $sort: { missionCount: -1 } },
      {
        $lookup: {
          from: "magicmovers",
          localField: "_id",
          foreignField: "_id",
          as: "mover",
        },
      },
      { $unwind: "$mover" },
      { $project: { _id: 0, name: "$mover.name", missionCount: 1 } },
    ]);
  }
}
