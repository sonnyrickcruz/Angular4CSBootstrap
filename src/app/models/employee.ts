export class Employee {
    name: string;
    nickName: string;
    role: Role;
    businessGroupObject: BusinessGroup;
}

export class Role {
    roleName: string;
}

export class BusinessGroup {
    businessGroup: string;
    businessGroupCode: string;
}

export class User {
    username: string;
    employee: Employee;
}

export class UserSkill {
    username: string;
    skillId: number;
    skillProficiencyId: number;
}