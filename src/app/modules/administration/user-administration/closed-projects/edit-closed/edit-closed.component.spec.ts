import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClosedComponent } from './edit-closed.component';

describe('EditClosedComponent', () => {
  let component: EditClosedComponent;
  let fixture: ComponentFixture<EditClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClosedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
