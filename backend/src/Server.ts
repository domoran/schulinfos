import StaticAuth from './auth/StaticAuth';
import { LoginController } from './routes/login';

import * as express from 'express';
import * as session from 'express-session';
import * as passport from 'passport';

export default class Server {
    public app: express.Application;

    constructor() {
        this.app = express();

        this.config();
    }

    public listen(port: number) {
        return this.app.listen(port);
    }

    protected config() {
        this.app.use(session({ secret: 'IcanhazCheeseBurgerz!' }));
        this.app.use(express.urlencoded({ extended: false }));

        this.app.use(passport.initialize());
        this.app.use(passport.session());

        this.app.use('/', new LoginController(new StaticAuth()).getRouter());
    }
}
