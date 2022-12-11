import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFilterToolbarActionsComponent } from './date-filter-toolbar-actions.component';

describe('DateFilterToolbarActionsComponent', () => {
  let component: DateFilterToolbarActionsComponent;
  let fixture: ComponentFixture<DateFilterToolbarActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateFilterToolbarActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DateFilterToolbarActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
