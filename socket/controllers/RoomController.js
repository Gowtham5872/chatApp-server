import Room from "../../models/Room.js";
import BaseController from "./BaseController.js";

export default class RoomController extends BaseController {
  joinRoom = async ({ roomId, userId }) => {
    try {
      roomId = decodeURIComponent(roomId).trim(); // Decode and trim roomId
      const room = await Room.findOne({ roomId });
      if (!room) {
        this.socket.emit("error", { message: "Room not found." });
        return;
      }
      this.socket.join(roomId);
      this.socket.emit("room-joined", { roomId, userId });
    } catch (error) {
      console.error("Error joining room:", error);
    }
  };

  newRoomCreated = async ({ roomId, userId }) => {
    try {
      roomId = decodeURIComponent(roomId).trim(); // Decode and trim roomId
      const room = new Room({
        name: `Room-${roomId.slice(0, 4)}`,
        roomId,
        userId,
      });
      await room.save();
      this.socket.emit("new-room-created", { room });
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  roomRemoved = async ({ roomId }) => {
    try {
      roomId = decodeURIComponent(roomId).trim(); // Decode and trim roomId
      await Room.deleteOne({ roomId });
      this.socket.emit("room-removed", { roomId });
    } catch (error) {
      console.error("Error removing room:", error);
    }
  };
}


