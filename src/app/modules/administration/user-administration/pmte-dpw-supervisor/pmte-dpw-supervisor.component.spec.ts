import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmteDpwSupervisorComponent } from './pmte-dpw-supervisor.component';

describe('PmteDpwSupervisorComponent', () => {
  let component: PmteDpwSupervisorComponent;
  let fixture: ComponentFixture<PmteDpwSupervisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmteDpwSupervisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PmteDpwSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
