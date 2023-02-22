import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddXYZComponent } from './add-xyz.component';

describe('AddXYZComponent', () => {
  let component: AddXYZComponent;
  let fixture: ComponentFixture<AddXYZComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddXYZComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddXYZComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
