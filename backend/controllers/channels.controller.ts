import { Request, Response, NextFunction } from "express";
import Channel from "../models/channels.model";

const SERVER_ERROR = "SERVER_ERROR";
const CHATROOM_ALREADY_EXISTS = "CHANNEL_ALREADY_EXISTS";


class ChannelController {

    // créer une channel
  
  static async create(req: Request, res: Response): Promise<void> {
    try {

        const { name } = req.body;

        const chatroomExists = await Channel.findOne({ name });

        if (chatroomExists) {
            throw "Channel with that name already exists!";
        }

        const chatroom = new Channel({ name });
        await chatroom.save();
        
        res.status(200).send({ ok: true, message: "Chatroom created!" });
    } catch (error) {
        console.error(error);

        if (error.code === 11000) {

            res.status(409).send({ ok: false, code: CHATROOM_ALREADY_EXISTS });
        }

        res.status(500).send({ ok: false, code: SERVER_ERROR, error });
    }
  }

  //récupérer toutes les channels et messages

  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const channels = await Channel.find().populate('messages');

      res.status(200).json(channels);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de tous les channels :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la récupération de tous les channels",
      });
    }
  }

  // récupérer une channel avec ses messages

  static async getOne(req: Request, res: Response): Promise<void> {
    try {

    const id = req.params.id 
      
    const channel = await Channel.findById(id).populate('messages');

      res.status(200).json(channel);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de la channel et de ses messages :",
        error
      );
      res.status(500).json({
        message: "Erreur lors de la récupération de la channel et de ses messages ",
      });
    }
  }

  // update le name d'une channel

  static async updateName(req: Request, res: Response): Promise<void> {
    try {
      const channelId = req.params.id;
      const updateData = req.body;
      const update = await Channel.findByIdAndUpdate(channelId, updateData, {
        new: true,
      });

      if (!update) {
        res.status(404).json({ message: "Channel non trouvé" });
      }
      res.status(200).json({
        message: "Name update ",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la channel :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour de channel" });
    }
  }

  //delete une channel 

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const channelId = req.params.id;

      const deleteChannel = await Channel.findByIdAndDelete(channelId);

      if (!deleteChannel) {
        res.status(404).json({ message: "Channel non trouvé" });
      }

      res.status(200).json({ message: "Channel est supprimé" });
    } catch (error) {
      console.error("Erreur lors de la suppression de la Channel :", error);
      res
        .status(500)
        .json({ message: "Erreur lors de la suppression de la Channel" });
    }
  }

}

export default ChannelController;
