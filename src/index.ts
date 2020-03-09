import { Client } from './Client';

export function createClient(url: string) {
	return new Client(url);
}
