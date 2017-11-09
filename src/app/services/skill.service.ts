import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Skill, SkillLevel, SkillSet, SkillCategory, UserSkillName, IndemandSkill } from '../models/skill';
import { LocalStorageService } from 'ngx-webstorage';
import 'rxjs/add/operator/map';

@Injectable()
export class SkillService {
  MOCK_INDEMAND_SKILLS: IndemandSkill[] = [{
    id: 1,
    name: "Javascript",
    img: "assets/Logos/JS.png"
  },{
    id: 2,
    name: "C#",
    img: "assets/Logos/cSharp.png"
  },{
    id: 3,
    name: "Java",
    img: "assets/Logos/java.png"
  },{
    id: 4,
    name: "Angular JS",
    img: "assets/Logos/Angular.png"
  },{
    id: 5,
    name: "Phyton",
    img: "assets/Logos/phyton.png"
  },{
    id: 6,
    name: "MySQL",
    img: "assets/Logos/mysql.png"
  }];
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
    img: "assets/Icons/11 stakeholders.png",
    level: 4
  },{
    id: 1,
    name: "Ecosystem Map",
    img: "assets/Icons/12 ecosystem map.png",
    level: 3
  },{
    id: 1,
    name: "Competitive Analysis",
    img: "assets/Icons/13 Competitive Analysis.png",
    level: 5
  },{
    id: 1,
    name: "Content Analysis",
    img: "assets/Icons/14 Content Analysis.png",
    level: 5
  },{
    id: 1,
    name: "Task Analysis",
    img: "assets/Icons/12 Task Analysis.png",
    level: 0
  },{
    id: 1,
    name: "User Serveys",
    img: "assets/Icons/15 User surveys.png",
    level: 0
  },{
    id: 1,
    name: "User Interviews",
    img: "assets/Icons/16 user interviews.png",
    level: 0
  },{
    id: 1,
    name: "Personas",
    img: "assets/Icons/17 personas.png",
    level: 0
  }];
  getSkillCategories() {
    return this.MOCK_SKILL_CATEGORY;
  }
  MOCK_SKILLS: Skill[] = [
    // {
    //   "id": 1,
    //   "groupId": 1,
    //   "name": "Adobe Experience Design",
    //   "createdDate": 1386927444000,
    //   "createdBy": "keane.godoy",
    //   "description": "Adobe Experience Design The quick brown fox jumps over a lazy dog"
    // },
    // {
    //   "id": 2,
    //   "groupId": 1,
    //   "name": "Adobe Illustrator",
    //   "createdDate": 1386927444000,
    //   "createdBy": "keane.godoy",
    //   "description": "Adobe Illustrator The quick brown fox jumps over a lazy dog"
    // },
    // {
    //   "id": 3,
    //   "groupId": 1,
    //   "name": "Adobe Photoshop",
    //   "createdDate": 1386927444000,
    //   "createdBy": "keane.godoy",
    //   "description": "Adobe Photoshop The quick brown fox jumps over a lazy dog"
    // },
    // {
    //   "id": 4,
    //   "groupId": 1,
    //   "name": "Axure",
    //   "createdDate": 1386927444000,
    //   "createdBy": "keane.godoy",
    //   "description": "axure The quick brown fox jumps over a lazy dog"
    // },
    // {
    //   "id": 5,
    //   "groupId": 1,
    //   "name": "Balsamiq",
    //   "createdDate": 1386927444000,
    //   "createdBy": "keane.godoy",
    //   "description": "balsamiq The quick brown fox jumps over a lazy dog"
    // },
    // {
    //   "id": 6,
    //   "groupId": 1,
    //   "name": "Card Sorting",
    //   "createdDate": 1386927444000,
    //   "createdBy": "keane.godoy",
    //   "description": "balsamiq The quick brown fox jumps over a lazy dog"
    // },
    // {
    //   "id": 7,
    //   "groupId": 1,
    //   "name": "Comparative Analysis",
    //   "createdDate": 1386927444000,
    //   "createdBy": "keane.godoy",
    //   "description": "Comparative Analysis The quick brown fox jumps over a lazy dog"
    // },
    // {
    //   "id": 8,
    //   "groupId": 1,
    //   "name": "High-fidelity Prototype",
    //   "createdDate": 1386927444000,
    //   "createdBy": "keane.godoy",
    //   "description": "balsamiq The quick brown fox jumps over a lazy dog"
    // },
    // {
    //   "id": 9,
    //   "groupId": 1,
    //   "name": "Information Architecture",
    //   "createdDate": 1386927444000,
    //   "createdBy": "keane.godoy",
    //   "description": "balsamiq The quick brown fox jumps over a lazy dog"
    // }
  ];
  MOCK_SKILL_LEVELS: SkillLevel[] = [{
    level: 1,
    label: "interested",
    description: "I have no idea but I want to learn it."
  },{
    level: 2,
    label: "familiar",
    description: "Small amout of knowledge."
  },{
    level: 3,
    label: "Used",
    description: "Used it in project"
  },{
    level: 4,
    label: "Master",
    description: "Used it for more than 3 years. I can teach you this."
  },{
    level: 5,
    label: "Guru",
    description: "I know everything about it and I don't need google"
  }]
  MOCK_USER_SKILLS: UserSkillName[] = [];

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

  saveSkillLevel(skillId, level, username, skill) {
    let isSuccessful = false;
    try {
      let userSkills: UserSkillName[] = this._localStorage.retrieve('userSkills');
      let found = false;
      if (userSkills == null) {
        userSkills = [];
      }
      userSkills.forEach(userSkill => {
        if (!found && skillId == userSkill.skill.id && username == userSkill.username) {
          userSkill.skillProficiencyId = level;
          found = true;
          isSuccessful = true;
          console.log("Skill Added.");
        }
      })
      if (!found) {
        console.log("adding");
        userSkills.push({
          username: username,
          skill: skill,
          skillProficiencyId: level
        });
        isSuccessful = true;
        console.log("Skill Updated.");
      }
      this._localStorage.store("userSkills", userSkills)
    } catch (e) {
      console.log("Skill not added due to some errors.")
    }
    return isSuccessful;
  }

  getSkillLevelsUser(username) {
    let userSkills = this._localStorage.retrieve('userSkills');
    let skillLevels = [];
    if (userSkills)
    userSkills.forEach(element => {
      if (element.username == username) {
        skillLevels.push({
          "username":element.username,
          "skill":element.skill,
          "skillProficiencyId":element.skillProficiencyId
        })
      }
    });
    return skillLevels;
  }

  getUserSkillLevel(username, skillId) {
    let userSkills = this._localStorage.retrieve('userSkills');
    let skillLevel;
    if (userSkills)
    userSkills.forEach(element => {
      if (element.username == username && element.skill.id == skillId) {
        skillLevel = element.skillProficiencyId;
      }
    });
    return skillLevel;
  }

  getUserSkillLevels(username) {
    let skills = [];
    let userSkills = this._localStorage.retrieve('userSkills');
    if (userSkills != null)
    userSkills.forEach(userSkill => {
      skills.push({
        "id": userSkill.skill.id,
        "groupId": userSkill.skill.groupId,
        "name": userSkill.skill.name,
        "createdDate": userSkill.skill.createdDate,
        "createdBy": userSkill.skill.createdBy,
        "description": userSkill.skill.description
      })
    })
    return skills;
  }

  getIndemandSkills() {
    return this.MOCK_INDEMAND_SKILLS;
  }

  /*Call to Actual Service Starts here!*/
  constructor(private _http: Http,
              private _localStorage:LocalStorageService) { }

  private _ldapURL = "http://172.26.54.34:8085/skill-search/";
  private _addSkillUrl = "http://172.26.54.34:8085/resource-skill/";
  retrieveSkillBySearchStr(searchStr) {
    return this._http.get(this._ldapURL + searchStr).map(this._extractRetrievedData)
  }
  
  saveSkillLevelService(skillId, level, username) {
    return this._http.post(this._addSkillUrl, {
        "username": username,
        "skillId": skillId,
        "skillProficiencyId" : level
      }).map(this._extractRetrievedData);
  }
  
  private _extractRetrievedData(res) {
    let body = res.json();
    return body || {};
  }
}
