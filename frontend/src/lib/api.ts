import { IUser } from '../../../backend/src/data/models';
import jquery from 'jquery';

class Api {

    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    public getCurrentUser(): Promise<IUser> {
        return new Promise<IUser>(
            (resolve, reject) => {
                jquery.getJSON(this.endpoint + '/userstatus').then(
                    (data: any) => {
                        console.log(data);
                        resolve(data);
                    }).catch((err: string) => {
                        reject(err);
                    });
            },
        );
    }

    public login (username: string, password: string):Promise<IUser> {
        return new Promise<IUser>(
            (resolve, reject) => {
                jquery.getJSON(this.endpoint + '/login?username=' + encodeURIComponent(username) + "&password=" + encodeURIComponent(password)).then(
                    (data: any) => {
                        console.log("Login success!", data);
                        resolve(data);
                    }).catch((err: any) => {
                        reject(err);
                    });
            },
        );
    }
}

export default new Api('http://localhost:8080');
