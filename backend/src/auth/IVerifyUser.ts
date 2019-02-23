import { IVerifyOptions } from 'passport-local';
import { IUser } from '../data/models';

export default interface IVerifyUser {
    verify(
        username: string,
        password: string,
        done: (error: string, user?: IUser | null) => void,
    ): void;

    serialize(user: IUser): string;

    getFromId(id: string): Promise<IUser>;
}
