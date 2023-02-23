import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingXYZComponent } from './loading-xyz.component';

describe('LoadingXYZComponent', () => {
  let component: LoadingXYZComponent;
  let fixture: ComponentFixture<LoadingXYZComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingXYZComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingXYZComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
