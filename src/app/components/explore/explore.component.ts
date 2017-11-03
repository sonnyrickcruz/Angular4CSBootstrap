import { Component, OnInit } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {
  roles: Role[];
  constructor(private _roleService: RoleService) { }

  ngOnInit() {
    this.roles = this._roleService.getRoles();
  }

  getImageUrl(name: string) {
      return "assets/Images/Roles/" + name.replace(/\s+/g, '-').toLowerCase() + ".png";
  }

}
