import { ISchool, ISchoolDB } from './models';

export default class InMemoryDB implements ISchoolDB {
    protected schools: ISchool[] = [];

    public findSchool(id: string): Promise<ISchool> {
        return new Promise<ISchool>((resolve: any, reject: any) => {
            if (id === '0') {
                resolve({ name: 'GKS'});
            } else {
                reject({});
            }
        });
    }

    public registerSchool(id: string): Promise<void> {
        throw new Error('');
    }
}
