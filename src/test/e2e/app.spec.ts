import { beforeAll, beforeEach, describe, expect, it } from 'bun:test';
import { Test, type TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import request from 'supertest';

describe('sum', () => {
	let appServer: any;

	// テストの準備
	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
		const app = moduleFixture.createNestApplication();
		await app.init();
		appServer = app.getHttpServer();
	});

	describe('GET /', () => {
		let response: any;

		beforeEach(async () => {
			response = await request(appServer).get('/');
		});
		it('status', () => {
			expect(response.status).toStrictEqual(200);
		});
		it('body', () => {
			expect(response.text).toStrictEqual('Hello World!');
		});
	});
});
