import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
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
  imageUrl = "assets/Images/Skills/adobe-experience-design.png";

  constructor(private _skillService: SkillService) { }

  ngOnInit() {
    this.skills = this._skillService.getSkills();
  }

  getImageUrl(name: string) {
      return "assets/Images/Skills/" + name.replace(/\s+/g, '-').toLowerCase() + ".png";
  }

}
