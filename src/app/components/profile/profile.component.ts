import { Component, OnInit } from '@angular/core';
import { User, UserSkill } from '../../models/employee';
import { Skill } from '../../models/skill';
import { UserService } from '../../services/user.service';
import { SkillService } from '../../services/skill.service';
import { AuthService } from '../../services/auth.service';
import { ImageService } from '../../services/image.service';

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
  profileImgUrl;
  
  constructor(private _userService: UserService,
              private _skillService: SkillService,
              private _authService: AuthService,
              private _imageservice: ImageService) { }

  ngOnInit() {
    this.user = this._authService.getUser();
    this.skillSets = this._skillService.getSkillSets();
    this.sortSkills();
    this.getProfilePic()
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
    let userSkills = this._skillService.getSkillLevelsUser(this.user.username)
    let skillLevels = this._skillService.getSkillLevels().reverse();
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
  
  getProfilePic() {
    this.profileImgUrl = this._imageservice.getUserImage(this.user.username);
  }
}
