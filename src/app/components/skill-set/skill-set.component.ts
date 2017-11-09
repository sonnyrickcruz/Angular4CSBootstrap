import { Component, OnInit } from '@angular/core';
import { SkillSet, SkillCategory } from '../../models/skill';
import { SkillService } from '../../services/skill.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-skill-set',
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.css']
})
export class SkillSetComponent implements OnInit {
  skillSets;
  skillCategories;
  skillLevels;
  starsCount = 2;
  constructor(private _skillService: SkillService,
              private _authService: AuthService) { }

  ngOnInit() {
    this.skillSets = this._skillService.getSkillSets();
    this.skillCategories = this._skillService.getSkillCategories();
    this.skillLevels = this._skillService.getSkillLevels();
  }

  getSkillLevelName(id) {
    let name = "";
    if (id != 0)
    this.skillLevels.forEach(skillLevel => {
      if (skillLevel.level == id) {
        name = skillLevel.label;
      }
    });
    return name;
  }

}
