import { Request } from 'express';

export class Context {
	private req!: Request;

	constructor(req: Request) {
		this.req = req;
	}

	public get viewer() {
		return null;
	}

	public async login() {
		throw new Error('Not implemented');
	}
}