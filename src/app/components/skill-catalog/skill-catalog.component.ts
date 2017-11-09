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
  page = 1;
  maxPage = (10) / 2;
  activeMenu;
  saveSkillClicked;
  skillCatalogFlag = true;

  isSaveSkillSuccess;
  saveSkillMessage;
  updatedMessage = "Skill added.";
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
    console.log(this.maxPage)
    this.searchStr = this._activatedRoute.snapshot.params['q'];
    this.skillLevels = this._skillService.getSkillLevels();
    this.getSkillLevel(this.range);
    this.user = this._auth.getUser();
    if (this._router.url == '/profile') {
      this.skills = this._skillService.getUserSkillLevels(this.user.username);
      this.skillCatalogFlag = false;
    } else if (this._router.url.includes('/skill-catalog')) {
      this.activeMenu = "all"
    }
    this.indexedSkills = this.skills
    console.log(this.searchStr);
    if (this.searchStr)
      this.searchSkillTrigger(this.searchStr);
  }

  getImageUrl(name: string) {
    return "assets/Images/Skills/" + name.replace(/\s+/g, '-').toLowerCase() + ".png";
  }

  getSkill(event) {
    this.saveSkillClicked = false;
    this.saveSkillMessage = '';
    let clickedSkillId = event;
    let skillProficiencyId;
    if (clickedSkillId) {
      skillProficiencyId = this._skillService.getUserSkillLevel(this.user.username, clickedSkillId);
      if (skillProficiencyId) {
        this.range = skillProficiencyId;
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
    this.saveSkillClicked = true;
    if (this.skill.id && this.range != null) {
      console.log(this.skill.id);
      console.log(this.range)
      this._skillService.saveSkillLevelService(this.skill.id, this.range, this.user.username).subscribe(
        (data) => {
          console.log(data)
          console.log(data.result)
          if (data.result == "success") {
            this._skillService.saveSkillLevel(this.skill.id, this.range, this.user.username, this.skill);
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
    if (this._timeout) {
      window.clearTimeout(this._timeout);
    }
    this._timeout = window.setTimeout(() => {
      this._timeout = null;
      this.searchSkillTrigger(event.target.value);
    }, 700);
  }

  searchSkillTrigger(searchStr) {
    if (searchStr) {
      let filteredSkills: Skill[] = [];
      this._skillService.retrieveSkillBySearchStr(searchStr).subscribe((data) => {
        console.log(data)
        this.paginateSkills(data);
      }, (err) => {
        //Don't do anything
      })
    }
  }

  getAllSkills() {
    this.activeMenu = "all"
    this.skills = this.indexedSkills;
    this.searchSkillTrigger(this.searchStr);
  }

  getUserSkills() {
    // For future get skills that were added by user
    this.activeMenu = "my skills"
    this.skills = null;
    if (this.skills)
      this.paginateSkills(this.skills)
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
    this.page = page;
    console.log(this.skillPages)
    this.skillPages.forEach(skillPage => {
      if (skillPage.page == page) {
        this.skills = skillPage.skills;
      }
    })
  }
}
