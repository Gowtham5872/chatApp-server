import BaseController from "./BaseController.js";




export default class MessageController extends BaseController {
  sendMessage = ({ message, roomId }) => {
    let skt = this.socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;

    // Broadcast message to others in the room
    skt.emit("message-from-server", { message, self: false });

    // Send message back to the sender
    this.socket.emit("message-from-server", { message, self: true });
  };
}


