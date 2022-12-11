import {
  AfterContentChecked,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  formatISO,
  getISOWeek,
  getISOWeekYear,
  getMonth,
  getQuarter,
  getWeek,
  getYear,
} from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import { Subscription } from 'rxjs';
import {
  DateFilterValue,
  DateFilterGroupButton,
  DateFilterTagFilterItem,
  DateFilterTagFilterItemType,
  DateFilterGroupButtonType,
} from './date-filter.model';
import { DateFilterService } from './date-filter.service';
import { SharedService } from './shared.service';

export const DATE_FILTER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateFilterComponent),
  multi: true,
};

@Component({
  selector: 'nk-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.scss'],
  providers: [DATE_FILTER_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DateFilterComponent
  implements OnInit, ControlValueAccessor, OnChanges, AfterContentChecked
{
  @Input() minYear: number = 2010;
  @Input() maxYear: number = 2030;
  @Input() tagFilters: Array<DateFilterTagFilterItemType> = [
    DateFilterTagFilterItemType.TODAY,
  ];
  @Output() onToggle: EventEmitter<boolean> = new EventEmitter();

  public isPreviewVisible: boolean = true;
  public isExpanded: boolean = false;
  public toggleContentSubscription: Subscription;
  public selectPeriodTypeSubscription: Subscription;
  public selectedBtn: DateFilterGroupButton;
  public value: DateFilterValue = {
    from: null,
    to: null,
    timezone: null,
  };
  public dateFilterForm: FormGroup = new FormGroup({
    from: new FormControl(null),
    to: new FormControl(null),
    timezone: new FormControl(null),
    week: new FormControl(null),
    year: new FormControl(null),
    month: new FormControl(null),
    quarter: new FormControl(null),
  });
  public onModelChange: Function = () => {};
  public onModelTouched: Function = () => {};

  public buttons: Array<DateFilterGroupButton> = [
    {
      text: this.translate.instant('G_DAY'),
      type: DateFilterGroupButtonType.DAY,
      index: 0,
      selected: false,
    },
    {
      text: this.translate.instant('G_WEEK'),
      type: DateFilterGroupButtonType.WEEK,
      index: 1,
      selected: false,
    },
    {
      text: this.translate.instant('G_MONTH'),
      type: DateFilterGroupButtonType.MONTH,
      index: 2,
      selected: false,
    },
    {
      text: this.translate.instant('G_QUARTER'),
      type: DateFilterGroupButtonType.QUARTER,
      index: 3,
      selected: false,
    },
    {
      text: this.translate.instant('G_YEAR'),
      type: DateFilterGroupButtonType.YEAR,
      index: 4,
      selected: false,
    },
    {
      text: this.translate.instant('G_PERIOD'),
      type: DateFilterGroupButtonType.PERIOD,
      index: 5,
      selected: false,
    },
  ];

  constructor(
    private sharedService: SharedService,
    private translate: TranslateService,
    public cd: ChangeDetectorRef,
    public service: DateFilterService
  ) {
    this.toggleContentSubscription = this.sharedService.toggleContent.subscribe(
      (isExpanded: boolean) => {
        this.togglePreviewVisibility(!isExpanded);
        if (this.isExpanded !== isExpanded) {
          this.onToggle.emit(isExpanded);
        }
        this.isExpanded = isExpanded;
      }
    );
    this.selectPeriodTypeSubscription =
      this.sharedService.selectPeriodType.subscribe((data: any) => {
        if (data?.type) {
          this.buttons.forEach((item, index) => {
            item.selected = false;
          });

          this.value = data.value;

          this.onSelectedChange(
            true,
            (this.buttons as any).filter((x: any) => x.type === data.type)[0]
          );
        }
      });
  }

  ngOnInit(): void {
    this.selectedBtn = this.buttons.find(
      (x) => x.selected === true
    ) as DateFilterGroupButton;

    this.dateFilterForm.valueChanges.subscribe((value) => {
      value.type = this.selectedBtn.type;
      this.value = this.service.getFilterOutputValue(value);
      const modelValue = this.service.formatModelValue(this.value);
      this.onModelChange(modelValue);
    });
  }

  changeTimezone(date: Date, ianatz: string) {
    // suppose the date is 12:00 UTC
    var invdate = new Date(
      date.toLocaleString('en-US', {
        timeZone: ianatz,
      })
    );

    // then invdate will be 07:00 in Toronto
    // and the diff is 5 hours
    var diff = date.getTime() - invdate.getTime();

    // so 12:00 in Toronto is 17:00 UTC
    return new Date(date.getTime() - diff); // needs to substract
  }

  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  ngOnChanges(value: SimpleChanges): void {}

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  writeValue(value: DateFilterValue): void {
    if (value) {
      const activeButton = this.buttons.find(
        (x) => x.type === value.type
      ) as DateFilterGroupButton;
      if (activeButton) {
        this.buttons[activeButton.index as number].selected = true;
        this.selectedBtn = activeButton;
        this.cd.markForCheck();
      }

      // this.value.type = activeButton.type;
      this.value = this.service.getFilterInputValue(value);
      const modelValue = this.service.formatModelValue(this.value);
      this.onModelChange(modelValue);
    }
  }

  onSpacerClick(event: MouseEvent): void {
    this.sharedService.toggleContent.next(true);
  }

  onSelectedChange(isTrue: boolean, button: DateFilterGroupButton): void {
    this.sharedService.toggleContent.next(true);
    this.buttons[button.index as number].selected = false;
    if (isTrue) {
      this.buttons[button.index as number].selected = true;
      this.selectedBtn = button;
      this.value.type = button.type;
      this.value = this.service.getFilterOutputValue(this.value);
      const modelValue = this.service.formatModelValue(this.value);
      this.onModelChange(modelValue);
    }
  }

  onButtonClick($event: MouseEvent, button: DateFilterGroupButton): void {
    if (this.selectedBtn?.index === button?.index) {
      this.sharedService.toggleContent.next(true);
    }
  }

  togglePreviewVisibility(visible: boolean): void {
    this.isPreviewVisible = visible;
  }
}
