import { Client } from './Client.ts';

export function createClient(url: string) {
	return new Client(url);
}
