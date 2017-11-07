import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Skill, SkillLevel, SkillSet, SkillCategory } from '../models/skill';
import 'rxjs/add/operator/map';

@Injectable()
export class SkillService {
  MOCK_SKILL_SET: SkillSet[] = [{
    id: 1,
    name: "User Research",
    "desc": "Ablity to understand (by qualitative and / or quantitative research) how users behavve, how they think and what are their actions, thoughts, feelings, motivations and needs.",
    img: "assets/Icons/01 User research.png"
  },{
    id: 2,
    name: "Interactivity",
    "desc": "Ability to design inituitive flows and interactions, achieving the easier way to go from point 'A' to point 'B' in each screen. Ability to descrive interface behavior as a result to others actions.",
    img: "assets/Icons/02 Interactivity.png"
  },{
    id: 3,
    name: "Visual Design",
    "desc": "Ability to create polished and pleasing layouts, with well-crafted and refined screens. Ability to use colors, typography, shapes, etc. according to an specific purpose rather than intuitions or personal tastes.",
    img: "assets/Icons/03 Visual Design.png"
  },{
    id: 4,
    name: "Prototyping",
    "desc": "Ability to build something (a rough interface, an intermediate interface or the final interface) to interact, test, and iterate. Ability to use prototyping tools or to code as a front-end developer.",
    img: "assets/Icons/04 Prototyping.png"
  }];
  getSkillSets() {
    return this.MOCK_SKILL_SET;
  }
  MOCK_SKILL_CATEGORY: SkillCategory[] = [{
    id: 1,
    name: "Stakeholder Research",
    img: "assets/Icons/11 stakeholders.png"
  },{
    id: 1,
    name: "Ecosystem Map",
    img: "assets/Icons/12 ecosystem map.png"
  },{
    id: 1,
    name: "Competitive Analysis",
    img: "assets/Icons/13 Competitive Analysis.png"
  },{
    id: 1,
    name: "Content Analysis",
    img: "assets/Icons/14 Content Analysis.png"
  },{
    id: 1,
    name: "Task Analysis",
    img: "assets/Icons/12 Task Analysis.png"
  },{
    id: 1,
    name: "User Serveys",
    img: "assets/Icons/15 User surveys.png"
  },{
    id: 1,
    name: "User Interviews",
    img: "assets/Icons/16 user interviews.png"
  },{
    id: 1,
    name: "Personas",
    img: "assets/Icons/17 personas.png"
  }];
  getSkillCategories() {
    return this.MOCK_SKILL_CATEGORY;
  }
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
