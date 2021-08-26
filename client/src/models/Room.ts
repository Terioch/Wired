export interface Message {
	id: number;
	sender: string;
	value: string;
	room_id: number;
	isDefault: boolean;
}

export interface Room {
	id: number;
	name: string;
	slug: string;
	admin: string;
	members: Array<String>;
	messages: Array<Message>;
}
