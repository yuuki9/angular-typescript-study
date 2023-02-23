import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddplyComponent } from './add-ply.component';

describe('AddplyComponent', () => {
  let component: AddplyComponent;
  let fixture: ComponentFixture<AddplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
