import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpcdComponent } from './add-pcd.component';

describe('AddpcdComponent', () => {
  let component: AddpcdComponent;
  let fixture: ComponentFixture<AddpcdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpcdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpcdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
