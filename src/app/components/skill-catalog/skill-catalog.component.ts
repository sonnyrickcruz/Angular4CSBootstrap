import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../../models/skill';
import { User } from '../../models/user';
import { SkillService } from '../../services/skill.service';
import { SkillLevel } from '../../models/skill-level';
import { UserService } from '../../services/user.service';
import { UserSkill } from '../../models/user-skill';

@Component({
  selector: 'app-skill-catalog',
  templateUrl: './skill-catalog.component.html',
  styleUrls: ['./skill-catalog.component.css']
})
export class SkillCatalogComponent implements OnInit {
  skills: Skill[];
  skill: Skill;
  skillLevel: SkillLevel;
  skillLevels: SkillLevel[];
  user: User;

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
              private _userService: UserService) { }

  ngOnInit() {
    this.skills = this._skillService.getSkills();
    this.skillLevels = this._skillService.getSkillLevels();
    this.getSkillLevel(this.range);
    this.user = this._userService.getUserByUserName('gian.liwanag');
  }

  getImageUrl(name: string) {
    return "assets/Images/Skills/" + name.replace(/\s+/g, '-').toLowerCase() + ".png";
  }

  getSkill(event) {
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
      this._userService.saveSkillLevel(this.skill.id, this.range, this.user.username);
    }
  }

}
