import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Add3dsComponent } from './add-3ds.component';

describe('Add3dsComponent', () => {
  let component: Add3dsComponent;
  let fixture: ComponentFixture<Add3dsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Add3dsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Add3dsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
