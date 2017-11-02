import { Injectable } from '@angular/core';
import { Skill } from '../models/skill';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SkillService {
  MOCK_SKILLS: Skill[] = [
    {
      "id": 249,
      "groupId": 1,
      "name": "Microsoft Web Service",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": ""
    },
    {
      "id": 249,
      "groupId": 1,
      "name": "Microsoft Web Service2",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": ""
    }
  ]
  constructor() { }

  getSkills() {
    return this.MOCK_SKILLS;
  }

}
