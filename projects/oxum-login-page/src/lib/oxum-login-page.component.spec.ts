import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OxumLoginPageComponent } from './oxum-login-page.component';

describe('OxumLoginPageComponent', () => {
  let component: OxumLoginPageComponent;
  let fixture: ComponentFixture<OxumLoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OxumLoginPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OxumLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
