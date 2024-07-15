import express from "express";
import { MagicMoverController } from "../controllers/magic-mover.controller";
import { container } from "tsyringe";

const router = express.Router();
const magicMoverController = container.resolve(MagicMoverController);

router.post("/", magicMoverController.addMagicMover.bind(magicMoverController));
router.post(
  "/items",
  magicMoverController.addMagicItem.bind(magicMoverController)
);
router.post(
  "/load",
  magicMoverController.loadMagicMover.bind(magicMoverController)
);
router.post(
  "/:magicMoverId/start-mission",
  magicMoverController.startMission.bind(magicMoverController)
);
router.post(
  "/:magicMoverId/end-mission",
  magicMoverController.endMission.bind(magicMoverController)
);
router.get(
  "/top",
  magicMoverController.listTopMovers.bind(magicMoverController)
);

export default router;
