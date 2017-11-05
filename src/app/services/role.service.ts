import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Role } from '../models/employee';

@Injectable()
export class RoleService {

  MOCK_ROLES: Role[] = [
    {
      roleName: "UX Designer"
    },
    {
      roleName: "App Management Engineer"
    },
    {
      roleName: "Business Analyst"
    },
    {
      roleName: "Data Engineer"
    },
    {
      roleName: "Data Scientist"
    },
    {
      roleName: "Graphic Designer"
    },
    {
      roleName: "IT Architect"
    },
    {
      roleName: "Mobile Developer"
    },
    {
      roleName: "Project Coordinator"
    },
    {
      roleName: "Quality Engineer"
    },
    {
      roleName: "Software Developer"
    },
    {
      roleName: "Software Test Analyst"
    }
  ]

  constructor() { }

  getRoles() {
    return this.MOCK_ROLES;
  }

}
