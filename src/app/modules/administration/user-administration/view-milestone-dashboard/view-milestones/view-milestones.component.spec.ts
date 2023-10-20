import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMilestonesComponent } from './view-milestones.component';

describe('ViewMilestonesComponent', () => {
  let component: ViewMilestonesComponent;
  let fixture: ComponentFixture<ViewMilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMilestonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
