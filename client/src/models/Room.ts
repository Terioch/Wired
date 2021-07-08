export interface Member {
	name: string;
}

export interface Room {
	id: number;
	name: string;
	admin: string;
	members: Array<Member>;
}
