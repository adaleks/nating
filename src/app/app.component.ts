import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { zonedTimeToUtc } from 'date-fns-tz';
import {
  DateFilterTagFilterItemType,
  DateFilterValue,
} from 'projects/nating-kendo/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  title = 'nati-kendo-ui';
  public minYear = 2015;
  public maxYear = 2022;

  public dateFilter: any = {
    from: new Date().toISOString(),
    to: new Date().toISOString(),
    type: 'day',
    timezone: 'America/Los_Angeles',
    // timezone: 'America/Toronto',
    // timezone: 'America/New_York',
    // timezone: 'Asia/Yakutsk',
  };

  public tagFilters: Array<DateFilterTagFilterItemType> = [
    DateFilterTagFilterItemType.TODAY,
    DateFilterTagFilterItemType.YESTERDAY,
    DateFilterTagFilterItemType.LAST_7_DAYS,
    DateFilterTagFilterItemType.LAST_30_DAYS,
    DateFilterTagFilterItemType.LAST_MONTH,
    DateFilterTagFilterItemType.THIS_WEEK,
    DateFilterTagFilterItemType.THIS_MONTH,
  ];

  constructor(translate: TranslateService) {}

  onDateFilterChange(value: DateFilterValue) {
    console.log('DT Filter Value: ', value);
  }

  onDateFilterToggle(value: boolean) {
    console.log('DT Filter Expanded: ', value);
  }
}
