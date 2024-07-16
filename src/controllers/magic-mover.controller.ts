import { NextFunction, Response, Request } from "express";
import { MagicMoverService } from "../services/magic-mover.service";
import { injectable } from "tsyringe";
import { IMagicMoverInput } from "../interfaces/magic-mover.interface";
import { IMagicItemInput } from "../interfaces/magic-item.interface";

@injectable()
export class MagicMoverController {
  constructor(private readonly magicMoverService: MagicMoverService) {}

  async addMagicMover(req: Request<{},{},IMagicMoverInput,{}>, res: Response, next: NextFunction) {
    try {
      const { name, weightLimit } = req.body;

      const magicMover = await this.magicMoverService.addMagicMover(
    name,
  weightLimit
      );
      res.status(201).json(magicMover);
    } catch (error) {
      next(error);
    }
  }

  async addMagicItem(req: Request<{},{},IMagicItemInput,{}>, res: Response, next: NextFunction) {
    try {
      const { name, weight } = req.body;
      const magicItem = await this.magicMoverService.addMagicItem(
        name,
        weight
      );
      res.status(201).json(magicItem);
    } catch (error) {
      next(error);
    }
  }

  async loadMagicMover(req: Request, res: Response, next: NextFunction) {
    try {
      const { magicMoverId, itemIds } = req.body;
      const magicMover = await this.magicMoverService.loadMagicMover(
        magicMoverId,
        itemIds
      );
      res.json(magicMover);
    } catch (error) {
      next(error);
    }
  }

  async startMission(req: Request<{magicMoverId:string},{},{},{}>, res: Response, next: NextFunction) {
    try {
      const { magicMoverId } = req.params;
      const magicMover = await this.magicMoverService.startMission(
        magicMoverId
      );
      res.json(magicMover);
    } catch (error) {
      next(error);
    }
  }

  async endMission(req: Request<{magicMoverId:string},{},{},{}>, res: Response, next: NextFunction) {
    try {
      const { magicMoverId } = req.params;
      const magicMover = await this.magicMoverService.endMission(magicMoverId);
      res.json(magicMover);
    } catch (error) {
      next(error);
    }
  }

  async listTopMovers(req: Request<{},{},{},{}>, res: Response, next: NextFunction) {
    try {
      const topMovers = await this.magicMoverService.listTopMovers();
      res.json(topMovers);
    } catch (error) {
      next(error);
    }
  }
}
