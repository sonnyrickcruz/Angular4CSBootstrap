export class SkillPage {
    page: number;
    skills: Skill[];
}

export class Skill {
    id: number;
    groupId: number;
    name: string;
    createdDate: number;
    createdBy: string;
    description: string;
}

export class SkillLevel {
    level: number;
    label: string;
    description: string;
}

export class SkillSet {
    id: number;
    name: string;
    desc: string;
    img: string;
}

export class SkillCategory {
    id: number;
    name: string;
    img: string;
    level: number;
}

export class UserSkillName {
    username: string;
    skillProficiencyId: number;
    skill: Skill;
}

export class IndemandSkill {
    id: number;
    name: string;
    img: string;
}