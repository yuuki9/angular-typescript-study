import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeyModeComponent } from './servey-mode.component';

describe('ServeyModeComponent', () => {
  let component: ServeyModeComponent;
  let fixture: ComponentFixture<ServeyModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServeyModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServeyModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
