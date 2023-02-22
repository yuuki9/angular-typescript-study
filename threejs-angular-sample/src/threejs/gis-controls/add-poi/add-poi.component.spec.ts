import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPOIComponent } from './add-poi.component';

describe('AddPoiComponent', () => {
  let component: AddPOIComponent;
  let fixture: ComponentFixture<AddPOIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPOIComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPOIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
