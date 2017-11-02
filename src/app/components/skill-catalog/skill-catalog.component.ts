import { Component, OnInit } from '@angular/core';
import { Skill } from '../../models/skill';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-skill-catalog',
  templateUrl: './skill-catalog.component.html',
  styleUrls: ['./skill-catalog.component.css']
})
export class SkillCatalogComponent implements OnInit {
  skills: Skill[];
  name: string;
  createdBy: string;

  constructor(private _skillService: SkillService) { }

  ngOnInit() {
    this.skills = this._skillService.getSkills();
  }

}
