import { resolve } from 'url';
import { IUser } from '../data/models';
import { AdminUser } from './default_users';
import IVerifyUser from './IVerifyUser';

class StaticAuth implements IVerifyUser {
    public verify(username: string, password: string, done: (error: any, user?: IUser | null) => void): void {
        if (username === 'admin' && password === 'admin') {
            done(null, AdminUser);
        } else {
            done('Invalid username or password!', null);
        }
    }

    public serialize(user: IUser): string {
        return user.id;
    }

    public getFromId(id: string): Promise<IUser> {
        return new Promise<IUser>(
                (
                    resolveFn: (user: IUser) => void,
                    rejectFn: (err: string) => void,
                ) => {
                    if  (id === 'admin') {
                        resolveFn(AdminUser);
                    } else {
                        rejectFn('Unknown user');
                    }
        });
    }
}

export default StaticAuth;
