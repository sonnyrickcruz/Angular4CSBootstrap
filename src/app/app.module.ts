import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { Ng2CompleterModule } from "ng2-completer";
import { SkillService } from "./services/skill.service";

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SkillCatalogComponent } from './components/skill-catalog/skill-catalog.component';
import { ExploreComponent } from './components/explore/explore.component';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'skill-catalog', component: SkillCatalogComponent},
  {path: 'explore', component: ExploreComponent},
  // {path: 'navbar', component: NavbarComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    SkillCatalogComponent,
    ExploreComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    Ng2CompleterModule
  ],
  providers: [
    SkillService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
