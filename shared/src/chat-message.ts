export default interface ChatMessage {
    id?: string,
    author: string | null,
    text: string,
    timeStamp: Date
}