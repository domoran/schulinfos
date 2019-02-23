import App from './../src/Server';

import { assert } from 'chai';
import { suite, test } from 'mocha-typescript';
import * as request from 'supertest';
import { AdminUser } from '../src/auth/default_users';

@suite class LoginTest {

    public static before() {
        this.agent = request.agent(this.server.app);
    }

    protected static cookie: string | null = null;
    protected static server: App = new App();
    protected static agent: request.SuperTest<request.Test>;

    @test public test_that_userstatus_is_null_without_login() {
        LoginTest.agent
            .get('/userstatus')
            .end((err: any, res: request.Response) => {
                assert.deepEqual(res.body, {});
                if (err) { throw err; }
            });
    }

    @test public test_that_we_can_login(done: () => void) {
        LoginTest.agent
            .get('/login?username=admin&password=admin')
            .then((res: request.Response) => {
                LoginTest.cookie = res.header['set-cookie'];
                assert.deepEqual(res.body, AdminUser);

                LoginTest.agent.get('/userstatus').end((err: any, res2: request.Response) => {
                    assert.isNull(err);
                    assert.deepEqual(res2.body, AdminUser);
                    if (err) { throw err; }
                    done();
                });
            });

    }

    @test public test_that_we_can_logout() {
        LoginTest.agent
            .get('/logout')
            .then((res: request.Response) => {
                assert.equal(res.status, 200);

                LoginTest.agent.get('/userstatus')
                    .end((err: any, res2: request.Response) => {
                        assert.isNull(err);
                        assert.deepEqual(res2.body, {});
                        if (err) { throw err; }
                    });
            });
    }
}
