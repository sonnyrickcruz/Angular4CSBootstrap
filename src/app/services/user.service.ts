import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserSkill } from '../models/user-skill';

@Injectable()
export class UserService {

  MOCK_USERS: User[] = [{
    "username": "gian.liwanag",
    "employee": {
      "name": "Liwanag, Gian Carlo B.",
      "nickName": null,
      "role": { "roleName": "Software Developer" },
      "businessGroupObject": { "businessGroup": "Banking and Retail", "businessGroupCode": "BR" }
    }
  }, {
    "username": "sonny.cruz",
    "employee": {
      "name": "Cruz, Sonny Rick B.",
      "nickName": null,
      "role": { "roleName": "Software Developer" },
      "businessGroupObject": { "businessGroup": "Transportation and Logistics", "businessGroupCode": "T&L" }
    }
  }
  ]

  MOCK_USERS_SKILLS: UserSkill[] = [{
    username: "gian.liwanag",
    skillId: 1,
    skillProficiencyId: 2
  },{
    username: "gian.liwanag",
    skillId: 2,
    skillProficiencyId: 4
  },{
    username: "gian.liwanag",
    skillId: 5,
    skillProficiencyId: 3
  },{
    username: "sonny.cruz",
    skillId: 5,
    skillProficiencyId: 3
  },{
    username: "sonny.cruz",
    skillId: 8,
    skillProficiencyId: 3
  }]
  constructor() { }

  getUserByUserName(username: string) {
    let userLogin;
    this.MOCK_USERS.forEach(user => {
      if (user.username == username) {
        userLogin = user;
      }
    });
    return userLogin;
  }

  getUserSkillInfo(username: string, skillId:number) {
    let retrievedSkillInfo;
    this.MOCK_USERS_SKILLS.forEach(skillInfo => {
      if (skillInfo.username == username && skillInfo.skillId == skillId) {
        retrievedSkillInfo = skillInfo;
      }
    });
    return retrievedSkillInfo;
  }

  saveSkillLevel(skillId, level, username) {
    let found = false;
    this.MOCK_USERS_SKILLS.forEach(userSkill => {
      if (!found && skillId == userSkill.skillId && username == userSkill.username) {
        userSkill.skillProficiencyId = level;
        found = true;
        console.log("found");
      }
    })
    if (!found) {
      console.log("adding");
      this.MOCK_USERS_SKILLS.push({
        username: username,
        skillId: skillId,
        skillProficiencyId: level
      });
    }
  }
}
