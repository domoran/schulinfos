export interface IDatabase {
    findUser(): void;
}

export interface IUser {
    id: string;
    username: string;
    global_roles: GlobalRoles[];
    class_roles: IClassRoleAssignment[];
}

export enum GlobalRoles {
    ADMIN = 'admin',
}

export enum ClassRolesType {
    CLASSOWNER = 'class owner',
    USER = 'user',
}

export interface IClassRoleAssignment {
    type: ClassRolesType;
    classId: string;
}

export interface IRole {
    type: ClassRolesType;
}

export interface IClassRole extends IRole {
    classId: string;
}

export interface ISchool {
    id: string;
    name: string;
}

export interface ISchoolDB {
    findSchool(id: string): Promise<ISchool>;

    registerSchool(id: string): Promise<void>;
}
