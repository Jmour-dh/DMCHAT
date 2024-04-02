import express, { Router } from "express";
import MessageController from "../controllers/messages.controller";

const router: Router = express.Router();

// GET ALL MESSAGE D'UNE CHANNEL

router.get("message/", MessageController.getAllMessagesOneChannel);

// GET ONE MESSAGE D'UNE CHANNEL

router.delete("message/:id",MessageController. deleteOneMessage);

// GET ALL MESSAGES D'UN USER 

router.get("message/user/:id",MessageController.getAllMessagesUser);

export default router;