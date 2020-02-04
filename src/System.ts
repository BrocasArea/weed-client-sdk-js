import { Client } from './Client';

interface CheckVersionResponse {
	success: boolean;
	reason: string;
	info: VersionInfo;
}

interface VersionInfo {
	version: string;
	url: string;
}

interface GetNoticeResponse {
	messages: string;
	updatedAt: Date;
}

class System {
	client: Client;
	constructor(client: Client) {
		this.client = client;

		this.client.on('event', (evt) => {
			console.log(evt);
		})
	}

	checkVersion(platform: string, version: string): Promise<CheckVersionResponse> {
		return this.client.invokeMethod('System.checkVersion', [ platform, version ]);
	}

	getNotice(options: object): Promise<GetNoticeResponse> {
		return this.client.invokeMethod('System.getNotice', [ options ]);
	}

	startEventReceiver(): Promise<void> {
		return this.client.invokeMethod('System.startEventReceiver', []);
	}

}

export {
	System,
	CheckVersionResponse,
	VersionInfo,
	GetNoticeResponse,
}
