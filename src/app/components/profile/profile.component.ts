import { Component, OnInit } from '@angular/core';
import { User, UserSkill } from '../../models/employee';
import { Skill } from '../../models/skill';
import { UserService } from '../../services/user.service';
import { SkillService } from '../../services/skill.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  sortedSkills: Skill[];
  skillSets;
  showSkills = true;
  showSkillSet;
  
  constructor(private _userService: UserService,
              private _skillService: SkillService,
              private _authService: AuthService) { }

  ngOnInit() {
    this.user = this._authService.getUser();
    this.skillSets = this._skillService.getSkillSets();
    console.log(JSON.stringify(this.user));
    this.sortSkills();
  }

  showSkillsDiv() {
    this.showSkills = true;
    this.showSkillSet = false;
  }

  showSkillSetDiv() {
    this.showSkills = false;
    this.showSkillSet = true;
  }

  sortSkills() {
    let userSkills = this._skillService.getSkillLevelsUser(this.user.username);
    console.log(userSkills)
    let skillLevels = this._skillService.getSkillLevels().reverse();
    console.log(skillLevels)
    let skillToAdd: Skill;
    let count = 0;
    this.sortedSkills = [];
    
    skillLevels.forEach(skillLevel => {
      userSkills.forEach(userSkill => {
        if (skillLevel.level == userSkill.skillProficiencyId && count < 6) {
          skillToAdd = userSkill.skill
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
