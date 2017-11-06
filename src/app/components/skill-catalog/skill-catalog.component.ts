import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../../models/skill';
import { User, UserSkill } from '../../models/employee';
import { SkillService } from '../../services/skill.service';
import { SkillLevel } from '../../models/skill';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-skill-catalog',
  templateUrl: './skill-catalog.component.html',
  styleUrls: ['./skill-catalog.component.css']
})

export class SkillCatalogComponent implements OnInit {
  searchStr;
  skills: Skill[];
  indexedSkills: Skill[];
  userSkills: Skill[];
  skill: Skill;
  skillLevel: SkillLevel;
  skillLevels: SkillLevel[];
  user: User;

  isSaveSkillSuccess;
  saveSkillMessage;
  updatedMessage = "Skill updated.";
  errorMessage = "Error in adding skill.";

  range = 0;
  someRange2config: any = {
    behaviour: 'tap-drag',
    connect: true,
    step: 1,
    range: {
      min: 0,
      max: 4
    },
    pips: {
      mode: 'count',
      density: 20,
      values: 5
    }
  };

  constructor(private _skillService: SkillService,
    private _userService: UserService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.searchStr = this._activatedRoute.snapshot.params['q'];;
    this.skillLevels = this._skillService.getSkillLevels();
    this.getSkillLevel(this.range);
    this.user = this._userService.getUserByUserName('gian.liwanag');
    this.userSkills = this._userService.getUserSkills(this.user.username);
    if (this._router.url == '/profile') {
      this.skills = this.userSkills;
    } else if (this._router.url.includes('/skill-catalog')) {
      this.skills = this._skillService.getSkills();
    }
    this.indexedSkills = this.skills
    if (this.searchStr)
      this.searchSkillTrigger(this.searchStr);
  }

  getImageUrl(name: string) {
    return "assets/Images/Skills/" + name.replace(/\s+/g, '-').toLowerCase() + ".png";
  }

  getSkill(event) {
    this.saveSkillMessage = '';
    let clickedSkillId = event.target.parentNode.id;
    let userSkillInfo;
    if (clickedSkillId) {
      userSkillInfo = this._userService.getUserSkillInfo(this.user.username, clickedSkillId);
      if (userSkillInfo) {
        this.range = userSkillInfo.skillProficiencyId;
      } else {
        this.range = 0;
      }
    }

    this.skills.forEach(skill => {
      if (skill.id.toString() == clickedSkillId) {
        this.skill = skill;
        return;
      }
    });
  }

  getSkillLevel(level) {
    this.skillLevels.forEach(skillLevel => {
      if (skillLevel.level == level) {
        this.skillLevel = skillLevel;
        return;
      }
    });
  }

  saveSkillLevel() {
    if (this.skill.id && this.range != null) {
      this.isSaveSkillSuccess = this._userService.saveSkillLevel(this.skill.id, this.range, this.user.username);
    }
    if (this.isSaveSkillSuccess) {
      this.saveSkillMessage = this.updatedMessage;
    } else {
      this.saveSkillMessage = this.errorMessage;
    }
    this.userSkills = this._userService.getUserSkills(this.user.username);
  }

  searchSkill(event) {
    this.searchSkillTrigger(event.target.value);
  }

  searchSkillTrigger(searchStr) {
    let filteredSkills: Skill[] = [];
    let regex = /[^a-zA-Z0-9]/g;
    let searchString = searchStr.toLowerCase().replace(regex, "");
    let reversedString = searchString.split('').reverse().join('');
    let skillName;

    if (searchString && searchString.length > 1) {
      this.indexedSkills.forEach(skill => {
        skillName = skill.name.toLowerCase().replace(regex, "");
        if (skillName.includes(searchString) || skillName.includes(reversedString)) {
          filteredSkills.push(
            {
              "id": skill.id,
              "groupId": skill.groupId,
              "name": skill.name,
              "createdDate": skill.createdDate,
              "createdBy": skill.createdBy,
              "description": skill.description
            });
        }
      });
      this.skills = filteredSkills;
    } else {
      this.skills = this.indexedSkills;
    }
  }

  getAllSkills() {
    this.skills = this.indexedSkills;
  }

  getMySkills() {
    this.skills = this.userSkills;
  }
}
