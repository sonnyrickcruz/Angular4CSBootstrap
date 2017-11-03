import { Role } from './role';
import { BusinessGroup } from './business-group';

export class Employee {
    name: string;
    nickName: string;
    role: Role;
    businessGroupObject: BusinessGroup;
}