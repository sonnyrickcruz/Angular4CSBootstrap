import { Component, OnInit } from '@angular/core';
import { SkillSet, SkillCategory } from '../../models/skill';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-skill-set',
  templateUrl: './skill-set.component.html',
  styleUrls: ['./skill-set.component.css']
})
export class SkillSetComponent implements OnInit {
  skillSets;
  skillCategories;
  constructor(private _skillService: SkillService) { }

  ngOnInit() {
    this.skillSets = this._skillService.getSkillSets();
    this.skillCategories = this._skillService.getSkillCategories();
  }

}
