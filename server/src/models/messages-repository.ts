import {ChatMessage} from "@my-chat-app/shared"
import {connect, model, Schema} from "mongoose"

const MessageSchema = new Schema({
    author: String,
    text: String,
    timeStamp: Date
})

const MessageModel = model<ChatMessage>('ChatMessage', MessageSchema)

export const setupMongoDb = async (url: string) => {
    await connect(url)
}

export const loadAllMessages = async (): Promise<ChatMessage[]> => {
    return MessageModel.find({}).exec()
}

export const saveMessage = async (ChatMessage: ChatMessage): Promise<void> => {
    const newModel = new MessageModel(ChatMessage)
    newModel.save()
}