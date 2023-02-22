import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddobjComponent } from './add-obj.component';

describe('AddobjComponent', () => {
  let component: AddobjComponent;
  let fixture: ComponentFixture<AddobjComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddobjComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddobjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
