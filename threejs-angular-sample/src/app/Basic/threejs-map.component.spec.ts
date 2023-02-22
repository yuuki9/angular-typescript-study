import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreejsMapComponent } from './threejs-map.component';

describe('ThreejsMapComponent', () => {
  let component: ThreejsMapComponent;
  let fixture: ComponentFixture<ThreejsMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreejsMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreejsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
