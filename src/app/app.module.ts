import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Ng2CompleterModule } from "ng2-completer";
import { SkillService } from "./services/skill.service";
import { RoleService } from "./services/role.service";
import { UserService } from "./services/user.service";
import { AuthService } from "./services/auth.service";
import { NouisliderModule } from 'ng2-nouislider';
import { AvatarModule } from "ng2-avatar";
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SkillCatalogComponent } from './components/skill-catalog/skill-catalog.component';
import { ExploreComponent } from './components/explore/explore.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SkillSetComponent } from './components/skill-set/skill-set.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'skill-catalog', component: SkillCatalogComponent},
  {path: 'skill-catalog/:q', component: SkillCatalogComponent},
  {path: 'explore', component: ExploreComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'skill-set', component: SkillSetComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    SkillCatalogComponent,
    ExploreComponent,
    ProfileComponent,
    SkillSetComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    Ng2CompleterModule,
    NouisliderModule,
    AvatarModule.forRoot(),
    HttpModule
  ],
  providers: [
    SkillService,
    RoleService,
    UserService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
