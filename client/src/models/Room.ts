export interface Message {
	id?: number;
	sender: string;
	value: string;
	roomId: number;
}

export interface Member {
	name: string;
}

export interface Room {
	id: number;
	name: string;
	slug: string;
	admin: string;
	members: Array<Member>;
	messages: Array<Message>;
}
