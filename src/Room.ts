import { Client } from './Client';
import { PaginationMeta } from './Pagination';

interface GetRoomResponse {
	meta: PaginationMeta;
	rooms: RoomEntry[];
}

interface RoomEntry {
	id: string;
	name: string;
	description: string;
	status: string;
	memberCount: number;
}

interface RoomMessage {
	meta: RoomMessageMeta;
	content: string;
}

interface RoomMessageMeta {
	contentType: string;
}

class Room {
	client: Client;
	constructor(client: Client) {
		this.client = client;

		this.client.on('event', (evt) => {
			console.log(evt);
		})
	}

	getRooms(options: object = {}): Promise<GetRoomResponse> {
		return this.client.invokeMethod('Room.getRooms', [ options ]);
	}

	enterRoom(roomID: string, options: object = {}): Promise<void> {
		return this.client.invokeMethod('Room.enterRoom', [ roomID, options ]);
	}

	send(msg: RoomMessage): Promise<void> {
		return this.client.invokeMethod('Room.send', [ msg ]);
	}
}

export {
	Room,
	GetRoomResponse,
	RoomEntry,

	// Messaging
	RoomMessage,
	RoomMessageMeta,
}
