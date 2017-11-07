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
}