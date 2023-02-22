import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyModeComponent } from './survey-mode.component';

describe('ServeyModeComponent', () => {
  let component: SurveyModeComponent;
  let fixture: ComponentFixture<SurveyModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
