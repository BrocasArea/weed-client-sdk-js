import { Client } from './Client';

interface LoginResponse {
	success: boolean;
	info: AuthInfo;
}

interface AuthInfo {
	uid: string;
	displayName: string;
	token: string;
}

class Auth {
	client: Client;
	constructor(client: Client) {
		this.client = client;

		this.client.on('event', (evt) => {
			console.log(evt);
		})
	}

	login(clientID: string, username: string, password: string): Promise<LoginResponse> {
		return this.client.invokeMethod('Auth.login', [ clientID, username, password ]);
	}

}

export {
	Auth,
	LoginResponse,
	AuthInfo,
}
