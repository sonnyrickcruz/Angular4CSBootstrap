import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../../models/skill';
import { User, UserSkill } from '../../models/employee';
import { SkillService } from '../../services/skill.service';
import { AuthService } from '../../services/auth.service';
import { ImageService } from '../../services/image.service';
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
  errorMessage = "There's a service problem right now, please try again later.";

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
    private _auth: AuthService,
    private _imageService: ImageService) { }

  ngOnInit() {
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
      this._skillService.saveSkillLevelService(this.skill.id, this.range, this.user.username).subscribe(
        (data) => {
          if (data.result == "success") {
            this._skillService.saveSkillLevel(this.skill.id, this.range, this.user.username, this.skill);
            this.saveSkillMessage = "Skill added.";
            this.isSaveSkillSuccess = true;
          } else {
            this.saveSkillMessage = "Error in saving your skill.";
            if (this._skillService.saveSkillLevel(this.skill.id, this.range, this.user.username, this.skill)) {
              this.saveSkillMessage = this.saveSkillMessage + " But we found ways to save it for you. ";
            }
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
        this.paginateSkills(data);
      }, (err) => {
        this.getSkillMocks();
      })
    }
  }

  getSkillMocks() {
    let skills = this._skillService.getSkills();
    this.paginateSkills(skills);
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
    this.skillPages.forEach(skillPage => {
      if (skillPage.page == page) {
        this.skills = skillPage.skills;
      }
    })
  }

  getSkillImage(skillName) {
    let imgUrl;
    if (skillName) {
      imgUrl = this._imageService.getSkillImage(skillName);
    }
    return imgUrl;
  }

  isNew(rawDate) {
    let isNew = false;
    if (rawDate) {
      let oneDay = 86400000;//24*60*60*1000
      let diff;
      let date
      let today = new Date();
      date = new Date(rawDate);
      diff = today.valueOf() - date.valueOf();
      diff = Math.round(Math.abs(diff / (oneDay)));
      if (diff < 30) {
        isNew = true;
      }
    }
    return isNew;
  }

  getSkillLevelName(id) {
    let levelName;
    let level;
    let skillProficiencyId;
    if (id) {
      skillProficiencyId = this._skillService.getUserSkillLevel(this.user.username, id);
      if (skillProficiencyId) {
        level = skillProficiencyId;
      } else {
        level = 0;
      }
    }
    if (level)
      this.skillLevels.forEach(skillLevel => {
        if (skillLevel.level == level) {
          levelName = skillLevel.label.toLowerCase();
        }
      });
    return levelName;
  }
}
