import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Skill } from '../models/skill';
import 'rxjs/add/operator/map';

@Injectable()
export class SkillService {
  MOCK_SKILLS: Skill[] = [
    {
      "id": 249,
      "groupId": 1,
      "name": "Adobe Experience Design",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "Adobe Experience Design The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 249,
      "groupId": 1,
      "name": "Adobe Illustrator",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "Adobe Illustrator The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 249,
      "groupId": 1,
      "name": "Adobe Photoshop",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "Adobe Photoshop The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 249,
      "groupId": 1,
      "name": "Axure",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "axure The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 249,
      "groupId": 1,
      "name": "Balsamiq",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "balsamiq The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 249,
      "groupId": 1,
      "name": "Card Sorting",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "balsamiq The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 249,
      "groupId": 1,
      "name": "Comparative Analysis",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "Comparative Analysis The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 249,
      "groupId": 1,
      "name": "High-fidelity Prototype",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "balsamiq The quick brown fox jumps over a lazy dog"
    },
    {
      "id": 249,
      "groupId": 1,
      "name": "Information Architecture",
      "createdDate": 1386927444000,
      "createdBy": "keane.godoy",
      "description": "balsamiq The quick brown fox jumps over a lazy dog"
    }
  ]
  constructor() { }

  getSkills() {
    return this.MOCK_SKILLS;
  }

}
