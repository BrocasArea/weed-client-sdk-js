import { Client } from './Client';

class Table {
	client: Client;
	constructor(client: Client) {
		this.client = client;

		this.client.on('event', (evt) => {
			console.log(evt);
		})
	}

	selectSeat(tableID: string, seat: number, options: any = {}): Promise<void> {
		return this.client.invokeMethod('Table.selectSeat', [ tableID, seat, options ]);
	}

	setStatus(tableID: string, status: string): Promise<void> {
		return this.client.invokeMethod('Table.setStatus', [ tableID, status ]);
	}
}

export {
	Table,
}
