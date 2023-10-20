import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcurementMilestonesComponent } from './procurement-milestones.component';

describe('ProcurementMilestonesComponent', () => {
  let component: ProcurementMilestonesComponent;
  let fixture: ComponentFixture<ProcurementMilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcurementMilestonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcurementMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
