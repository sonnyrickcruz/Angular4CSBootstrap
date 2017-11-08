import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../../models/skill';
import { User, UserSkill } from '../../models/employee';
import { SkillService } from '../../services/skill.service';
import { AuthService } from '../../services/auth.service';
import { SkillLevel, SkillPage } from '../../models/skill';
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

  // with service
  skillPages: SkillPage[] = [];
  _timeout: any = null;

  isSaveSkillSuccess;
  saveSkillMessage;
  updatedMessage = "Skill updated.";
  errorMessage = "Error in adding skill.";

  range = 1;
  someRange2config: any = {
    behaviour: 'tap-drag',
    connect: true,
    step: 1,
    range: {
      min: 1,
      max: 5
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
    private _activatedRoute: ActivatedRoute,
    private _auth: AuthService) { }

  ngOnInit() {
    this.searchStr = this._activatedRoute.snapshot.params['q'];
    this.skillLevels = this._skillService.getSkillLevels();
    this.getSkillLevel(this.range);
    this.user = this._auth.getUser();
    this.userSkills = this._userService.getUserSkills(this.user.username);
    if (this._router.url == '/profile') {
      this.skills = this.userSkills;
    } else if (this._router.url.includes('/skill-catalog')) {
      //this.skills = this._skillService.getSkills();
    }
    this.indexedSkills = this.skills
    console.log(this.searchStr);
    if (this.searchStr)
      this.searchSkillTrigger(this.searchStr);
  }

  getUserSkills() {
    this.skills = this._skillService.getUserSkillLevels(this._auth.getUser().username)
    console.log(this.skills);
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
        this.range = 1;
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
      console.log(this.skill.id);
      console.log(this.range)
      this._skillService.saveSkillLevelService(this.skill.id, this.range, this.user.username).subscribe(
        (data) => {
          this._skillService.saveSkillLevel(this.skill.id, this.range, this.user.username, this.skill);
          console.log(data)
          console.log(data.result)
          if (data.result == "success") {
            this.saveSkillMessage = "Skill added";
            this.isSaveSkillSuccess = true;
          } else {
            this.saveSkillMessage = "Skill already exist";
            this.isSaveSkillSuccess = false;
          }
        },
        (err) => {
          this.saveSkillMessage = this.errorMessage;
        }
      );
    }
    this.userSkills = this._userService.getUserSkills(this.user.username);
  }

  searchSkill(event) {
    if(this._timeout){
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
      this._timeout = null;
      this.searchSkillTrigger(event.target.value);
    },700);
  }

  searchSkillTrigger(searchStr) {
    let filteredSkills: Skill[] = [];
    let regex = /[^a-zA-Z0-9]/g;
    let searchString = searchStr.toLowerCase().replace(regex, "");
    let reversedString = searchString.split('').reverse().join('');
    let skillName;
    this._skillService.retrieveSkillBySearchStr(searchStr).subscribe((data) => {
      console.log(data)
      this.paginateSkills(data);
    }, (err) => {
      //Don't do anything
    })
  }

  getAllSkills() {
    this.skills = this.indexedSkills;
    this.searchSkillTrigger(this.searchStr);
  }

  getMySkills() {
    this.skills = this.userSkills;
  }

  paginateSkills(skills) {
    let skillPerPage = 20;
    let skillsPerPage: Skill[] = [];
    let pageCount = 1;

    this.skillPages = [];
      skills.forEach(data => {
        skillsPerPage.push({
          "id": data.id,
          "groupId": data.groupId,
          "name": data.name,
          "createdDate": data.createdDate,
          "createdBy": data.createdBy,
          "description": data.description
        });
        if (skillsPerPage.length == skillPerPage) {
          this.skillPages.push({
            page: pageCount,
            skills: skillsPerPage
          })
          if (pageCount == 1) {
            this.skills = skillsPerPage;
          }
          skillsPerPage = [];
          pageCount += 1;
        }
      });
    if (skills.length < skillPerPage) {
      this.skillPages.push({
        page: 1,
        skills: skillsPerPage
      })
    }
    this.setSkillByPage(1)
  }

  setSkillByPage(page) {
    console.log(this.skillPages)
    this.skillPages.forEach(skillPage => {
      if (skillPage.page == page) {
        this.skills = skillPage.skills;
      }
    })
  }
}
