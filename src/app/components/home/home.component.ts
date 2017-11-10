import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CompleterService, CompleterData } from 'ng2-completer';
import { AuthService } from '../../services/auth.service';
import { SkillService } from '../../services/skill.service';
import { IndemandSkill } from '../../models/skill';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  indemandSkills;
  searchStr: string;
  protected dataService: CompleterData;
  searchStorage;
  constructor(private _completerService: CompleterService,
    private _authService: AuthService,
    private _skillService: SkillService,
    private _router: Router,
    private _sanitizer: DomSanitizer) {
    // init search
    this.dataService = _completerService.local([], 'name', 'name');
  }

  ngOnInit() {
    if (!this._authService.isAuthenticated()) {
      this._router.navigate(['/login']);
    }
    this.getIndemandSkills();
  }

  // This will make warnings from browser gone
  videoUrl() {
    return this._sanitizer.bypassSecurityTrustResourceUrl("assets/Videos/video-bg-udacity.mp4");
  }

  exploreImgUrl() {
    return "assets/Images/creative-passionate-effective.png";
  }

  searchSkill(event) {
    if (event.keyCode == 13)
    if (this.searchStr && this.searchStr.length > 0) {
      this._router.navigate(['skill-catalog', this.searchStr]);
    }
  }

  getSkillBySearchStr() {
    this.processResults()
  }
  
  processResults() {
    this._skillService.retrieveSkillBySearchStr(this.searchStr).subscribe((data) => {
      if (this.searchStr.length == 1 && this.searchStr != ' ') {
        this.searchStorage = data;
        this.dataService = this._completerService.local(this.searchStorage, 'name', 'name');
      }
    }, (err) => {
      //Don't do anything
    })
  }

  getIndemandSkills() {
    this.indemandSkills = this._skillService.getIndemandSkills();
  }

}
