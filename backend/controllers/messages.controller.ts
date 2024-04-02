import { Request, Response, NextFunction } from "express";
import Message from "../models/messages.model";

const SERVER_ERROR = "SERVER_ERROR";


class MessageController {


  static async getAllMessagesOneChannel(req: Request, res: Response): Promise<void> {
    try {
        
      const msg = await Message.find({ channelId: req.params.id }).populate('user');
      
      res.status(200).send({ ok: true, msg});

  } catch (error) {
    console.log(error);
    res.status(500).send({ ok: false, code: SERVER_ERROR, error });
  }
  }

  static async getAllMessagesUser(req: Request, res: Response): Promise<void> {

    try {

      const msg = await Message.find({ userId: req.params.id  }).populate('channel');
      res.status(200).send({ ok: true, msg});

    } catch (error) {
      console.error(error);

      res.status(500).send({ ok: false, code: SERVER_ERROR, error });
    }
  }

  static async deleteOneMessage(req: Request, res: Response): Promise<void> {
    try {

      const msgId =  req.params.id
    
      await Message.findByIdAndDelete(msgId)
      res.status(200).send({ ok: true });
    } catch (error) {
      console.log(error);
      res.status(500).send({ ok: false, code: SERVER_ERROR, error });
    }
  }

}

export default MessageController;