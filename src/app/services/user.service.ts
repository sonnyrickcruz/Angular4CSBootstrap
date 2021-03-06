import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { User, UserSkill } from '../models/employee';
import { Skill } from '../models/skill';
import { SkillService } from '../services/skill.service';

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
  }, {
    username: "gian.liwanag",
    skillId: 2,
    skillProficiencyId: 4
  }, {
    username: "gian.liwanag",
    skillId: 5,
    skillProficiencyId: 3
  }, {
    username: "sonny.cruz",
    skillId: 4,
    skillProficiencyId: 3
  }, {
    username: "sonny.cruz",
    skillId: 8,
    skillProficiencyId: 3
  }]

  getUserByUserName(username: string) {
    let userLogin;
    this.MOCK_USERS.forEach(user => {
      if (user.username == username) {
        userLogin = user;
      }
    });
    return userLogin;
  }

  getUserSkills(username: string) {
    let userSkills: Skill[] = [];
    this.MOCK_USERS_SKILLS.forEach(skillInfo => {
      if (skillInfo.username == username) {
        userSkills.push(this._skillService.getSkillById(skillInfo.skillId));
      }
    });
    return userSkills;
  }

  getUserSkillLevels(username: string) {
    let userSkillLevels: UserSkill[] = [];
    this.MOCK_USERS_SKILLS.forEach(userSkill => {
      if (userSkill.username == username) {
        userSkillLevels.push({
          username: userSkill.username,
          skillId: userSkill.skillId,
          skillProficiencyId: userSkill.skillProficiencyId
        })
      }
    })
    return userSkillLevels;
  }

  getUserSkillInfo(username: string, skillId: number) {
    let retrievedSkillInfo;
    this.MOCK_USERS_SKILLS.forEach(skillInfo => {
      if (skillInfo.username == username && skillInfo.skillId == skillId) {
        retrievedSkillInfo = skillInfo;
      }
    });
    return retrievedSkillInfo;
  }

  saveSkillLevel(skillId, level, username, skill) {
    let isSuccessful = false;
    try {
      let found = false;
      this.MOCK_USERS_SKILLS.forEach(userSkill => {
        if (!found && skillId == userSkill.skillId && username == userSkill.username) {
          userSkill.skillProficiencyId = level;
          found = true;
          isSuccessful = true;
          console.log("Skill Added.");
        }
      })
      if (!found) {
        console.log("adding");
        this.MOCK_USERS_SKILLS.push({
          username: username,
          skillId: skillId,
          skillProficiencyId: level
        });
        isSuccessful = true;
        console.log("Skill Updated.");
      }
    } catch (e) {
      console.log("Skill not added due to some errors.")
    }
    return isSuccessful;
  }

  /*Call to Actual Service Starts here!*/
  constructor(private _skillService: SkillService,
    private _http: Http) { }

  private _ldapURL = "http://172.26.54.34:8085/authentication/login";
  login(username, password) {
    return this._http.post(this._ldapURL, {
      "username": username,
      "password": password
    }).map(this._extractUsersData);
  }


  private _extractUsersData(res) {
    let body = res.json();
    return body || {};
  }
}
