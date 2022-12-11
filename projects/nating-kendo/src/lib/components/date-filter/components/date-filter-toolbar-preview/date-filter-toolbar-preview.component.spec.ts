import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFilterToolbarPreviewComponent } from './date-filter-toolbar-preview.component';

describe('DateFilterToolbarPreviewComponent', () => {
  let component: DateFilterToolbarPreviewComponent;
  let fixture: ComponentFixture<DateFilterToolbarPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateFilterToolbarPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateFilterToolbarPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
