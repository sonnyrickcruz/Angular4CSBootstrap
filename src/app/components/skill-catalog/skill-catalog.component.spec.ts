import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillCatalogComponent } from './skill-catalog.component';

describe('SkillCatalogComponent', () => {
  let component: SkillCatalogComponent;
  let fixture: ComponentFixture<SkillCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
