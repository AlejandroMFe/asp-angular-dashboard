export interface ServerMessage {
    id: number;

    // represents the status of the server
    // true = online
    // false = offline
    status: boolean;
}