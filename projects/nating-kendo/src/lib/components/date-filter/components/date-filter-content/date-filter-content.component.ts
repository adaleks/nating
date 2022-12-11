import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { SharedService } from '../../shared.service';

import { Subscription } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import {
  DateFilterGroupButtonType,
  DateFilterTagFilterItem,
  DateFilterTagFilterItemType,
  DateFilterValue,
} from '../../date-filter.model';
import { FormGroup } from '@angular/forms';
import { DateFilterService } from '../../date-filter.service';
import { addDays, addWeeks, subDays } from 'date-fns';

const range = (start: number, stop: number) =>
  Array.from({ length: stop - start + 1 }, (_, i) => start + i);

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'nk-date-filter-content',
  templateUrl: './date-filter-content.component.html',
  styleUrls: ['./date-filter-content.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateFilterContentComponent implements OnInit, OnChanges {
  @Input() value: DateFilterValue;
  @Input() minYear: number;
  @Input() maxYear: number;
  @Input() tagFilters: Array<DateFilterTagFilterItemType>;
  @Input() form: FormGroup;

  public isExpanded: boolean = false;
  public toggleContentSubscription: Subscription;
  public listYears: Array<number>;
  public listWeeks: Array<number> = Array.from({ length: 52 }, (_, i) => i + 1);
  public listMonths: Array<number> = Array.from(
    { length: 12 },
    (_, i) => i + 1
  );
  public listQuarters: Array<number> = Array.from(
    { length: 4 },
    (_, i) => i + 1
  );

  public listTagFilters: Array<DateFilterTagFilterItem>;

  constructor(
    private sharedService: SharedService,
    private service: DateFilterService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.toggleContentSubscription = this.sharedService.toggleContent.subscribe(
      (isExpanded: boolean) => {
        this.isExpanded = isExpanded;
        // this.cd.detectChanges();
      }
    );
    this.listYears = range(this.minYear, this.maxYear);
    if (this.tagFilters) {
      this.listTagFilters = [
        {
          text: 'G_TODAY',
          type: DateFilterTagFilterItemType.TODAY,
          index: 0,
        },
        {
          text: 'G_YESTERDAY',
          type: DateFilterTagFilterItemType.YESTERDAY,
          index: 1,
        },
        {
          text: 'G_LAST_7_DAYS',
          type: DateFilterTagFilterItemType.LAST_7_DAYS,
          index: 2,
        },
        {
          text: 'G_LAST_30_DAYS',
          type: DateFilterTagFilterItemType.LAST_30_DAYS,
          index: 3,
        },
        {
          text: 'G_LAST_MONTH',
          type: DateFilterTagFilterItemType.LAST_MONTH,
          index: 4,
        },
        {
          text: 'G_THIS_WEEK',
          type: DateFilterTagFilterItemType.THIS_WEEK,
          index: 5,
        },
        {
          text: 'G_THIS_MONTH',
          type: DateFilterTagFilterItemType.THIS_MONTH,
          index: 6,
        },
      ].filter((item) => {
        return this.tagFilters.indexOf(item.type) !== -1;
      });
    } else {
      this.tagFilters = [];
    }
  }

  public get fc(): any {
    return this.form.controls;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      //set initial values
      this.setValues(changes['value'].currentValue);
    }
  }

  toggleContent() {
    this.isExpanded = !this.isExpanded;
    this.cd.detectChanges();
  }

  setValues(value: DateFilterValue) {
    this.fc.from.setValue(value?.from, { emitEvent: false });
    this.fc.to.setValue(value?.to, { emitEvent: false });
    this.fc.timezone.setValue(value?.timezone, { emitEvent: false });
    this.fc.week.setValue(value?.week, { emitEvent: false });
    this.fc.month.setValue(value?.month, { emitEvent: false });
    this.fc.quarter.setValue(value?.quarter, { emitEvent: false });
    this.fc.year.setValue(value?.year, { emitEvent: false });
  }

  onTagClick(tag: DateFilterTagFilterItem) {
    switch (tag.type) {
      case DateFilterTagFilterItemType.TODAY:
        this.value = this.service.getTagToday(this.value);
        this.form.patchValue(this.value);
        break;
      case DateFilterTagFilterItemType.YESTERDAY:
        this.value = this.service.getTagYesterday(this.value);
        this.form.patchValue(this.value);
        break;
      case DateFilterTagFilterItemType.LAST_7_DAYS:
        this.value = this.service.getTagLast7Days(this.value);
        this.sharedService.selectPeriodType.next({
          type: DateFilterGroupButtonType.PERIOD,
          value: this.value,
        });
        break;
      case DateFilterTagFilterItemType.LAST_30_DAYS:
        this.value = this.service.getTagLast30Days(this.value);
        this.sharedService.selectPeriodType.next({
          type: DateFilterGroupButtonType.PERIOD,
          value: this.value,
        });
        break;
      case DateFilterTagFilterItemType.LAST_MONTH:
        this.value = this.service.getTagLastMonth(this.value);
        this.sharedService.selectPeriodType.next({
          type: DateFilterGroupButtonType.MONTH,
          value: this.value,
        });
        break;
      case DateFilterTagFilterItemType.THIS_WEEK:
        this.value = this.service.getTagThisWeek(this.value);
        this.sharedService.selectPeriodType.next({
          type: DateFilterGroupButtonType.WEEK,
          value: this.value,
        });
        break;
      case DateFilterTagFilterItemType.THIS_MONTH:
        this.value = this.service.getTagThisMonth(this.value);
        this.sharedService.selectPeriodType.next({
          type: DateFilterGroupButtonType.MONTH,
          value: this.value,
        });
        break;

      default:
        break;
    }
  }

  increaseLeftDate() {
    switch (this.value.type) {
      case DateFilterGroupButtonType.DAY:
      case DateFilterGroupButtonType.PERIOD:
        this.value.from = addDays(this.value.from as Date, 1);
        break;
      default:
        this.value.year = (this.value.year as number) + 1;
        break;
    }

    this.form.patchValue(this.value);
  }

  increaseRightDate() {
    switch (this.value.type) {
      case DateFilterGroupButtonType.WEEK:
        if (this.value.week === 52) {
          this.value.week = 1;
          this.value.year = (this.value.year as number) + 1;
        } else {
          this.value.week = (this.value.week as number) + 1;
        }
        break;
      case DateFilterGroupButtonType.MONTH:
        if (this.value.month === 12) {
          this.value.month = 1;
          this.value.year = (this.value.year as number) + 1;
        } else {
          this.value.month = (this.value.month as number) + 1;
        }
        break;
      case DateFilterGroupButtonType.QUARTER:
        if (this.value.quarter === 4) {
          this.value.quarter = 1;
          this.value.year = (this.value.year as number) + 1;
        } else {
          this.value.quarter = (this.value.quarter as number) + 1;
        }
        break;
      case DateFilterGroupButtonType.PERIOD:
        this.value.to = addDays(this.value.to as Date, 1);
        break;

      default:
        break;
    }

    this.form.patchValue(this.value);
  }

  decreaseLeftDate() {
    switch (this.value.type) {
      case DateFilterGroupButtonType.DAY:
      case DateFilterGroupButtonType.PERIOD:
        this.value.from = subDays(this.value.from as Date, 1);
        break;

      default:
        this.value.year = (this.value.year as number) - 1;
        break;
    }

    this.form.patchValue(this.value);
  }

  decreaseRightDate() {
    switch (this.value.type) {
      case DateFilterGroupButtonType.WEEK:
        if (this.value.week === 1) {
          this.value.week = 52;
          this.value.year = (this.value.year as number) - 1;
        } else {
          this.value.week = (this.value.week as number) - 1;
        }
        break;
      case DateFilterGroupButtonType.MONTH:
        if (this.value.month === 1) {
          this.value.month = 12;
          this.value.year = (this.value.year as number) - 1;
        } else {
          this.value.month = (this.value.month as number) - 1;
        }
        break;
      case DateFilterGroupButtonType.QUARTER:
        if (this.value.quarter === 1) {
          this.value.quarter = 4;
          this.value.year = (this.value.year as number) - 1;
        } else {
          this.value.quarter = (this.value.quarter as number) - 1;
        }
        break;
      case DateFilterGroupButtonType.PERIOD:
        this.value.to = subDays(this.value.to as Date, 1);
        break;

      default:
        break;
    }

    this.form.patchValue(this.value);
  }
}
