import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamXYZComponent } from './stream-xyz.component';

describe('StreamXYZComponent', () => {
  let component: StreamXYZComponent;
  let fixture: ComponentFixture<StreamXYZComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamXYZComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StreamXYZComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
