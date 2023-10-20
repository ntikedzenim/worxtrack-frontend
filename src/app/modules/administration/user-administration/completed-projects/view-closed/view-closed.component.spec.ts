import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClosedComponent } from './view-closed.component';

describe('ViewClosedComponent', () => {
  let component: ViewClosedComponent;
  let fixture: ComponentFixture<ViewClosedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewClosedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
