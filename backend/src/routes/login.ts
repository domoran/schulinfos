import * as express from 'express';
import * as passport from 'passport';

import { IStrategyOptions, IVerifyOptions, Strategy as LocalStrategy, VerifyFunction } from 'passport-local';
import IVerifyUser from '../auth/IVerifyUser';
import { IUser } from '../data/models';

export class LoginController {

    protected localStrategy: LocalStrategy | undefined;
    protected verifyFunction: IVerifyUser;

    constructor(verifyFn: IVerifyUser) {
        this.verifyFunction = verifyFn;
    }

    public login(req: express.Request, res: express.Response) {
        res.json(req.user || {});
    }

    public logout(req: express.Request, res: express.Response) {
        req.logOut();
        res.end();
    }

    public getRouter(): express.Router {
        this.configurePassport();

        const r = express.Router();

        r.get('/logout', this.logout);
        r.get('/login', passport.authenticate('local'), this.login);
        r.get('/userstatus', this.login);

        return r;
    }

    protected configurePassport() {
        const options: IStrategyOptions = {
            passwordField: 'password',
            session: false,
            usernameField: 'username',
        };

        this.localStrategy = new LocalStrategy(options, this.verifyFunction.verify);

        passport.use('local', this.localStrategy);

        passport.serializeUser((user: IUser, done) => {
            done(null, this.verifyFunction.serialize(user));
        });

        passport.deserializeUser((id: string, done) => {
            this.verifyFunction.getFromId(id).then((user) => done(null, user));
        });
    }
}
