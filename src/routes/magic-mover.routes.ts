import express from "express";
import { MagicMoverController } from "../controllers/magic-mover.controller";
import { container } from "tsyringe";
import { ParamsValidator, RequestValidator, Schemas } from "../middlewares/requestvalidator.middleware";

const router = express.Router();
const magicMoverController = container.resolve(MagicMoverController);

router.post("/",
  RequestValidator(Schemas.mover.create),
  magicMoverController.addMagicMover.bind(magicMoverController));
router.post(
  "/items",
  RequestValidator(Schemas.item.create),
  magicMoverController.addMagicItem.bind(magicMoverController)
);
router.post(
  "/load",
  magicMoverController.loadMagicMover.bind(magicMoverController)
);
router.post(
  "/:magicMoverId/start-mission",
  ParamsValidator(Schemas.mover.startmission)
  ,
  magicMoverController.startMission.bind(magicMoverController)
);
router.post(
  "/:magicMoverId/end-mission",
  ParamsValidator(Schemas.mover.endmission)
,
  magicMoverController.endMission.bind(magicMoverController)
);
router.get(
  "/top",
  magicMoverController.listTopMovers.bind(magicMoverController)
);

export default router;
