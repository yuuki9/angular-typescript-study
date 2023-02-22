import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPolygonComponent } from './add-polygon.component';

describe('AddPolygonComponent', () => {
  let component: AddPolygonComponent;
  let fixture: ComponentFixture<AddPolygonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPolygonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPolygonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
