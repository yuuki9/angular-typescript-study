import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDEMComponent } from './add-dem.component';

describe('AddDemComponent', () => {
  let component: AddDEMComponent;
  let fixture: ComponentFixture<AddDEMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDEMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDEMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
