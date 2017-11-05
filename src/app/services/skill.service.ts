import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Skill } from '../models/skill';
import { SkillLevel } from '../models/skill';
import 'rxjs/add/operator/map';

@Injectable()
export class SkillService {
  MOCK_SKILLS: Skill[] = [
    {
      "id": 1,
      "groupId": 1,
      "name": "Adobe Experience Design",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "Adobe Experience Design The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 2,
      "groupId": 1,
      "name": "Adobe Illustrator",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "Adobe Illustrator The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 3,
      "groupId": 1,
      "name": "Adobe Photoshop",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "Adobe Photoshop The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 4,
      "groupId": 1,
      "name": "Axure",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "axure The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 5,
      "groupId": 1,
      "name": "Balsamiq",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "balsamiq The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 6,
      "groupId": 1,
      "name": "Card Sorting",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "balsamiq The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 7,
      "groupId": 1,
      "name": "Comparative Analysis",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "Comparative Analysis The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 8,
      "groupId": 1,
      "name": "High-fidelity Prototype",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "balsamiq The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 9,
      "groupId": 1,
      "name": "Information Architecture",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "balsamiq The quick brown fox jumps over a lazy dog"
    }
  ];
  MOCK_SKILL_LEVELS: SkillLevel[] = [{
    level: 0,
    label: "interested",
    description: "I have no idea but I want to learn it."
  },{
    level: 1,
    label: "familiar",
    description: "Small amout of knowledge."
  },{
    level: 2,
    label: "Used",
    description: "Used it in project"
  },{
    level: 3,
    label: "Master",
    description: "Used it for more than 3 years. I can teach you this."
  },{
    level: 4,
    label: "Guru",
    description: "I know everything about it and I don't need google"
  }]
  constructor() { }

  getSkills() {
    return this.MOCK_SKILLS;
  }
  
  getSkillLevels() {
    return this.MOCK_SKILL_LEVELS;
  }

  getSkillById(id: number): Skill {
    let retrievedSkill:Skill;
    this.MOCK_SKILLS.forEach(skill => {
      if (skill.id === id) {
        retrievedSkill = skill;
      }
    });
    return retrievedSkill;
  }

}
