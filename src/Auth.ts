import { Client } from './Client';

interface LoginResponse {
	/**
	 * 是否成功
	 */
	success: boolean;
	/**
	 * 登入資訊
	 */
	info: AuthInfo;
}

interface AuthInfo {
	uid: string;
	displayName: string;
	token: string;
}

/**
 * 權限
 */
class Auth {
	/** @ignore */
	client: Client;
	/** @ignore */
	constructor(client: Client) {
		this.client = client;

		this.client.on('event', (evt) => {
			console.log(evt);
		})
	}

	/**
	 * 登入
	 */
	login(clientID: string, username: string, password: string): Promise<LoginResponse> {
		return this.client.invokeMethod('Auth.login', [ clientID, username, password ]);
	}

}

export {
	Auth,
	LoginResponse,
	AuthInfo,
}
