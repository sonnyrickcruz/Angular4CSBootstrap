import { Component, OnInit } from '@angular/core';
import { User, UserSkill } from '../../models/employee';
import { Skill } from '../../models/skill';
import { UserService } from '../../services/user.service';
import { SkillService } from '../../services/skill.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  sortedSkills: Skill[];
  constructor(private _userService: UserService,
              private _skillService: SkillService) { }

  ngOnInit() {
    this.user = this._userService.getUserByUserName('gian.liwanag');
    console.log(JSON.stringify(this.user));
    this.sortSkills();
  }

  sortSkills() {
    let userSkills = this._userService.getUserSkillLevels(this.user.username);
    let skillLevels = this._skillService.getSkillLevels().reverse();
    let skillToAdd: Skill;
    let count = 0;
    this.sortedSkills = [];
    
    skillLevels.forEach(skillLevel => {
      userSkills.forEach(userSkill => {
        if (skillLevel.level == userSkill.skillProficiencyId && count < 6) {
          skillToAdd = this._skillService.getSkillById(userSkill.skillId)
          this.sortedSkills.push({
            "id": skillToAdd.id,
            "groupId": skillToAdd.groupId,
            "name": skillToAdd.name,
            "createdDate": skillToAdd.createdDate,
            "createdBy": skillToAdd.createdBy,
            "description": skillToAdd.description
          })
          count ++;
        }
      });
    });
    console.log(JSON.stringify(this.sortedSkills))
  }

  getImageUrl(name: string) {
    return "assets/Icons/" + name.replace(/\s+/g, '-').toLowerCase() + ".pngs";
  }
  test(event) {
    console.log(event)
    event.target.style.display="none";
  }
}
