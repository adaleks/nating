import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFilterContentComponent } from './date-filter-content.component';

describe('DateFilterContentComponent', () => {
  let component: DateFilterContentComponent;
  let fixture: ComponentFixture<DateFilterContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateFilterContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateFilterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
