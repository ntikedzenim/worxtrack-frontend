import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMilestonesComponent } from './update-milestones.component';

describe('UpdateMilestonesComponent', () => {
  let component: UpdateMilestonesComponent;
  let fixture: ComponentFixture<UpdateMilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMilestonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
