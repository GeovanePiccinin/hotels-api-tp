import express from "express";
import roomsRouter from "./routes/rooms.route.js";
import hotelsRouter from "./routes/hotels.route.js";
import usersRouter from "./routes/users.route.js";
import reservationsRouter from "./routes/reservations.route.js";

const router = express.Router();

router.use("/hotels", hotelsRouter);

/* ATIVIDADE 5 - CORRIJA o NOME dos recursos*/
router.use("/room", roomsRouter);

router.use("/users", usersRouter);
router.use("/reservations", reservationsRouter);

export default router;
