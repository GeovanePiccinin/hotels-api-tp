import express from "express";
import RoomsController from "../controllers/rooms.controller.js";
import RoomsValidator from "../validators/rooms.validator.js";
import pagination from "../../middlewares/pagination.middleware.js";
import { cacheMiddleware } from "../../middlewares/cache.middleware.js";

const router = express.Router();

/* ATIVIDADE 4 - CORRIJA os verbos HTTP para que o recomendado em APIs RESTful */
/* ATIVIDADE 5 - CORRIJA o NOME dos recursos e/ou a forma da URI*/
/* ATIVIDADE 7: aplique a paginação para esse endpoint */
/* ATIVIDADE 8: aplique o cache para esse endpoint */
router.post("/getRooms", RoomsController.getRooms);

/* ATIVIDADE 4 - CORRIJA os verbos HTTP para que o recomendado em APIs RESTful */
/* ATIVIDADE 5 - CORRIJA o NOME dos recursos e/ou a forma da URI*/
router.post("/getRoom/:id", RoomsController.getRoom);

router.post(
  "/",
  RoomsValidator.validate("createRoom"),
  RoomsController.createRoom
);

/* ATIVIDADE 4 - CORRIJA os verbos HTTP para que o recomendado em APIs RESTful */
router.post(
  "/:id",
  RoomsValidator.validate("updateRoom"),
  RoomsController.updateRoom
);

router.delete("/:id", RoomsController.deleteRoom);

export default router;
