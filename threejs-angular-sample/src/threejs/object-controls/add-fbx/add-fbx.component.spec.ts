import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFbxComponent } from './add-fbx.component';

describe('AddFbxComponent', () => {
  let component: AddFbxComponent;
  let fixture: ComponentFixture<AddFbxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFbxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFbxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
