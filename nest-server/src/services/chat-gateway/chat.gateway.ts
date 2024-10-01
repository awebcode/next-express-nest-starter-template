import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import type { User } from 'src/types/user';



@WebSocketGateway({
  cors: {
    origin: '*', // Enable CORS for cross-origin requests

  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private onlineUsers: User[] = [];

  // On user connection
  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  // On user disconnect
  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    this.onlineUsers = this.onlineUsers.filter((user) => user.id !== client.id);
    this.server.emit('onlineUsers', this.onlineUsers);
  }

  // Join a room
  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, { username, room }: { username: string; room: string }) {
    const user: User = { id: client.id, username, room };
    this.onlineUsers.push(user);

    // Make the user join the specified room
    client.join(room);

    // Notify others in the room that a user joined
    this.server.to(room).emit('message', {
      username: 'System',
      text: `${username} has joined the room.`,
    });

    // Send the updated list of online users
    this.server.emit('onlineUsers', this.onlineUsers);
  }

  // Handle message sent to the room
  @SubscribeMessage('sendMessage')
  handleMessage(client: Socket, { room, message, username }: { room: string; message: string; username: string }) {
    // Notify others in the room that a user sent a message
    this.server.to(room).emit('message', {
      username: 'System',
      text: `${username} has sent a message.`,
    });
  }
}
