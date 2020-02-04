import EventEmitter from './eventemitter';
import { JSONRPC, Notification } from './jsonrpc2';
import { System } from './System';
import { Auth } from './Auth';
import { Room } from './Room';
import { Table } from './Table';

class Client extends EventEmitter {
	serverUrl: string;
	ws: any;
	finished: boolean;
	jsonrpc: JSONRPC;

	// Services
	System: System;
	Auth: Auth;
	Room: Room;
	Table: Table;

	constructor(url: string) {
		super();
		this.finished = false;
		this.serverUrl = url;
		this.jsonrpc = new JSONRPC();

		// Services
		this.System = new System(this);
		this.Auth = new Auth(this);
		this.Room = new Room(this);
		this.Table = new Table(this);

		// Initializing RPC events
		this.initRPC();
	}

	initRPC() {

		this.jsonrpc.on('notification', (msg: Notification) => {
			let args: [string, ...any[]] = [ 'event', msg ];
			this.emit.apply(this, args);
		});

		this.jsonrpc.on('invoke', (job: any) => {
			console.log(job);
			this.ws.send(JSON.stringify(job));
		})
	}

	disconnect() {
		this.finished = false;
		this.ws.close();
	}

	createConnection(url: string): Promise<boolean> {

		return new Promise((resolve: (value: boolean) => void, reject: (value: Error) => void) => {

			this.ws = new WebSocket(url);

			this.ws.onopen = function() {
				console.log('Connected');
				resolve(true);
			};

			this.ws.onmessage = (evt: MessageEvent) => {
				this.receiveMessage(evt.data)
			};

			this.ws.onerror = function(e: Error) {
				reject(e);
			};

			this.ws.onclose = (evt: MessageEvent) => {
				console.log('CLOSED');

				// try to reconnect after 3 seconds
				if (!this.finished) {
					setTimeout(() => {
						this.connect();
					}, 3000);
				}
			};

		});
	}

	connect() {
		this.finished = false;
		return this.createConnection(this.serverUrl);
	}

	receiveMessage(data: string) {
		this.jsonrpc.receive(data);
	}

	invokeMethod(methodName: string, params: Array<any> = []) {
		return this.jsonrpc.invokeMethod(methodName, params);
	}
}

const Event = Notification;

export {
	Client,
	Event,
}
