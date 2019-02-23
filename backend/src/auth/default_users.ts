import { GlobalRoles, IUser } from '../data/models';

export const AdminUser: IUser = { id: 'admin', username: 'admin', global_roles: [GlobalRoles.ADMIN], class_roles: [] };
