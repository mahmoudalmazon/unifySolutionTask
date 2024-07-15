import { NextFunction, Response, Request } from "express";
import { MagicMoverService } from "../services/magic-mover.service";
import { injectable } from "tsyringe";

@injectable()
export class MagicMoverController {
  constructor(private readonly magicMoverService: MagicMoverService) {}

  async addMagicMover(req: Request, res: Response, next: NextFunction) {
    try {
      const magicMover = await this.magicMoverService.addMagicMover(
        req.body.name,
        req.body.weightLimit
      );
      res.status(201).json(magicMover);
    } catch (error) {
      next(error);
    }
  }

  async addMagicItem(req: Request, res: Response, next: NextFunction) {
    try {
      const magicItem = await this.magicMoverService.addMagicItem(
        req.body.name,
        req.body.weight
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

  async startMission(req: Request, res: Response, next: NextFunction) {
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

  async endMission(req: Request, res: Response, next: NextFunction) {
    try {
      const { magicMoverId } = req.params;
      const magicMover = await this.magicMoverService.endMission(magicMoverId);
      res.json(magicMover);
    } catch (error) {
      next(error);
    }
  }

  async listTopMovers(req: Request, res: Response, next: NextFunction) {
    try {
      const topMovers = await this.magicMoverService.listTopMovers();
      res.json(topMovers);
    } catch (error) {
      next(error);
    }
  }
}
