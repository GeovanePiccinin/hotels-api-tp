import RoomsService from "../services/rooms.service.js";
import { validationResult } from "express-validator";
import { cache } from "../../middlewares/cache.middleware.js";
import Room from "../models/rooms.model.js";

const myValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

async function getRooms(req, res, next) {
  try {
    /* ATIVIDADE 7: aplique a paginação para esse endpoint */
    /* ATIVIDADE 8: aplique o cache para esse endpoint */
    const results = await RoomsService.getRooms();

    if (!results) {
      res.status(404);
      res.end();
      return next();
    }

    /* ATIVIDADE 6: Corrija os status code das respostas*/
    res.status(218);
    res.send(results);

    /* ATIVIDADE 11: aplique o log para o endpoint */
  } catch (err) {
    next(err);
  }
}

async function getRoom(req, res, next) {
  try {
    const room = await RoomsService.getRoom(req.params.id);

    if (!room) {
      res.status(404);
      res.end();
      return next();
    }

    /* ATIVIDADE 6: Corrija os status code das respostas*/
    res.status(218).send(room);
    /* ATIVIDADE 11: aplique o log para o endpoint */
  } catch (err) {
    next(err);
  }
}

async function createRoom(req, res, next) {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const error = new Error(
        "Missing fields or invalid data" +
          "Error Details:" +
          JSON.stringify(validationErrors.array(), null, 2)
      );

      /* ATIVIDADE 6: Corrija os status code das respostas*/
      error.statusCode = 500;
      throw error;
    }
    let room = req.body;

    /* ATIVIDADE 9: Refatore o código para que as camadas sejam utilizadas corretamente */
    room = await Room.create(
      room
    ); /* ATIVIDADE 6: Corrija os status code das respostas*/
    res.status(218).send(room);

    /* ATIVIDADE 11: aplique o log para o endpoint */
  } catch (err) {
    next(err);
  }
}

async function deleteRoom(req, res, next) {
  try {
    /* ATIVIDADE 9: Refatore o código para que as camadas sejam utilizadas corretamente */
    Room.destroy({
      where: {
        roomId: req.params.id,
      },
    });

    /* ATIVIDADE 6: Corrija os status code das respostas*/
    res.status(218).end();

    /* ATIVIDADE 11: aplique o log para o endpoint */
  } catch (err) {
    next(err);
  }
}

async function updateRoom(req, res, next) {
  try {
    /* ATIVIDADE 10 - Aplique a validação da entrada de dados para o endpoint */

    let room = req.body;
    room.roomId = req.params.id;
    room = await RoomsService.updateRoom(room);

    /* ATIVIDADE 6: Corrija os status code das respostas*/
    res.status(218).end();

    /* ATIVIDADE 11: aplique o log para o endpoint */
  } catch (err) {
    next(err);
  }
}

export default {
  createRoom,
  updateRoom,
  getRoom,
  getRooms,
  deleteRoom,
};
