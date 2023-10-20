import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMilestoneDashboardComponent } from './view-milestone-dashboard.component';

describe('ViewMilestoneDashboardComponent', () => {
  let component: ViewMilestoneDashboardComponent;
  let fixture: ComponentFixture<ViewMilestoneDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMilestoneDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMilestoneDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
