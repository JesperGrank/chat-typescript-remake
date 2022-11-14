import {ChatMessage} from "@my-chat-app/shared"
import express, {Request, Response } from "express"
import { saveMessageItem, loadAllMessagesItem } from "../services/messages-service"

const messageController = express.Router()

messageController.get("/", async (req: Request, res: Response<ChatMessage[]>) => {
    res.send(await loadAllMessagesItem())
})

messageController.post("/", async (req: Request<ChatMessage>, res: Response<ChatMessage[]>) => {
    try{
        res.send(await saveMessageItem(req.body))
    } catch (e){
        res.sendStatus(400)
    }
    
})

export default messageController