import {ChatMessage} from "@my-chat-app/shared";
import { loadAllMessages, saveMessage } from "../models/messages-repository";

export const saveMessageItem = async (message: ChatMessage): Promise<ChatMessage[]> => {
    if(!message.author || message.author == "" ||  message.text == "" || !message.text.trim()){
        throw new Error("Invalid text or message")
    }

    message.timeStamp = new Date()
    await saveMessage(message)
    return await loadAllMessages()
}

export const loadAllMessagesItem = async (): Promise<ChatMessage[]> => {
    return await loadAllMessages()
}
