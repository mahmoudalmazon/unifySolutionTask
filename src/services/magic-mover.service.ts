import { IMagicItem } from "../interfaces/magic-item.interface";
import logger from "../config/logger";
import { MagicMoverRepository } from "../repositories/magic-mover.repo";
import { injectable } from "tsyringe";
import { MagicItemRepository } from "../repositories/magic-item.repo";
import { ActivityLogRepository } from "../repositories/activity-log.repo";
import { IMagicMover } from "../interfaces/magic-mover.interface";

@injectable()
export class MagicMoverService {
  constructor(
    private readonly magicMoverRepo: MagicMoverRepository,
    private readonly magicItemRepo: MagicItemRepository,
    private readonly activityLogRepo: ActivityLogRepository
  ) {}
  async addMagicMover(name: string, weightLimit: number) {
    const magicMover = await this.magicMoverRepo.create({
      name,
      weightLimit,
    });
    logger.info(`Magic Mover Created: ${name}`);
    return magicMover;
  }

  async addMagicItem(name: string, weight: number): Promise<IMagicItem> {
    const magicItem = await this.magicItemRepo.create({ name, weight });
    logger.info(`Magic Item added: ${name}`);
    return magicItem;
  }

  async loadMagicMover(
    magicMoverId: string,
    itemIds: string[]
  ): Promise<IMagicMover> {
    const magicMover = await this.magicMoverRepo.findById(magicMoverId);
    if (!magicMover) {
      throw new Error("Magic Mover not found");
    }
    if (magicMover.questState !== "resting") {
      throw new Error("Magic Mover is not in resting state");
    }
    const items = await this.magicItemRepo.find({ _id: { $in: itemIds } });
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight > magicMover.weightLimit) {
      throw new Error("Exceeds weight limit");
    }
    magicMover.items = itemIds as any;
    magicMover.questState = "loading";
    const updatedMover = await this.magicMoverRepo.update(
      magicMoverId,
      magicMover
    );
    await this.activityLogRepo.create({
      magicMover: magicMover._id,
      action: "loading",
    });
    logger.info(`Magic Mover ${magicMover.name} loaded with items`);
    return updatedMover!;
  }

  async startMission(magicMoverId: string): Promise<IMagicMover> {
    const magicMover = await this.magicMoverRepo.findById(magicMoverId);
    if (!magicMover) {
      throw new Error("Magic Mover not found");
    }
    if (magicMover.questState !== "loading") {
      throw new Error("Magic Mover is not in loading state");
    }
    magicMover.questState = "on-mission";
    const updatedMover = await this.magicMoverRepo.update(
      magicMoverId,
      magicMover
    );
    await this.activityLogRepo.create({
      magicMover: magicMover._id,
      action: "on-mission",
    });
    logger.info(`Magic Mover ${magicMover.name} started mission`);
    return updatedMover!;
  }

  async endMission(magicMoverId: string): Promise<IMagicMover> {
    const magicMover = await this.magicMoverRepo.findById(magicMoverId);
    if (!magicMover) {
      throw new Error("Magic Mover not found");
    }
    if (magicMover.questState !== "on-mission") {
      throw new Error("Magic Mover is not on a mission");
    }
    magicMover.questState = "resting";
    magicMover.items = [];
    const updatedMover = await this.magicMoverRepo.update(
      magicMoverId,
      magicMover
    );
    await this.activityLogRepo.create({
      magicMover: magicMover._id,
      action: "resting",
    });
    logger.info(`Magic Mover ${magicMover.name} ended mission`);
    return updatedMover!;
  }

  async listTopMovers() {
    return this.activityLogRepo.aggregateTopMovers();
  }
}
