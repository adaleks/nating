import { Injectable } from '@angular/core';
import {
  endOfDay,
  endOfISOWeek,
  endOfMonth,
  endOfYear,
  getISOWeek,
  getISOWeekYear,
  getMonth,
  getQuarter,
  getYear,
  lastDayOfISOWeek,
  lastDayOfMonth,
  lastDayOfQuarter,
  startOfDay,
  startOfISOWeek,
  startOfMonth,
  startOfQuarter,
  startOfYear,
  sub,
  subDays,
  subMonths,
} from 'date-fns';
import { toDate, utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';
import {
  DateFilterGroupButtonType,
  DateFilterValue,
} from './date-filter.model';

@Injectable({
  providedIn: 'root',
})
export class DateFilterService {
  constructor() {}

  getFilterInputValue(value: DateFilterValue) {
    let filterData: DateFilterValue = {};
    filterData.timezone = value?.timezone
      ? value?.timezone
      : Intl.DateTimeFormat().resolvedOptions().timeZone;

    filterData.type = value?.type;

    switch (filterData.type) {
      case 'day':
        const filterDayData = this.getFilterInputDayValue(value);
        filterData = { ...filterData, ...filterDayData };
        break;
      case 'week':
        const filterWeekData = this.getFilterInputWeekValue(value);
        filterData = { ...filterData, ...filterWeekData };
        break;
      case 'month':
        const filterMonthData = this.getFilterInputMonthValue(value);
        filterData = { ...filterData, ...filterMonthData };
        break;
      case 'quarter':
        const filterQuarterData = this.getFilterInputQuarterValue(value);
        filterData = { ...filterData, ...filterQuarterData };
        break;
      case 'year':
        const filterYearData = this.getFilterInputYearValue(value);
        filterData = { ...filterData, ...filterYearData };
        break;
      case 'period':
        const filterPeriodData = this.getFilterInputPeriodValue(value);
        filterData = { ...filterData, ...filterPeriodData };
        break;

      default:
        break;
    }

    return filterData;
  }

  getFilterOutputValue(value: DateFilterValue) {
    let filterData: DateFilterValue = {};
    filterData.timezone = value?.timezone
      ? value?.timezone
      : Intl.DateTimeFormat().resolvedOptions().timeZone;

    filterData.type = value?.type;

    switch (filterData.type) {
      case 'day':
        const filterDayData = this.getFilterOutputDayValue(value);
        filterData = { ...filterData, ...filterDayData };
        break;
      case 'week':
        const filterWeekData = this.getFilterOutputWeekValue(value);
        filterData = { ...filterData, ...filterWeekData };
        break;
      case 'month':
        const filterMonthData = this.getFilterOutputMonthValue(value);
        filterData = { ...filterData, ...filterMonthData };
        break;
      case 'quarter':
        const filterQuarterData = this.getFilterOutputQuarterValue(value);
        filterData = { ...filterData, ...filterQuarterData };
        break;
      case 'year':
        const filterYearData = this.getFilterOutputYearValue(value);
        filterData = { ...filterData, ...filterYearData };
        break;
      case 'period':
        const filterPeriodData = this.getFilterOutputPeriodValue(value);
        filterData = { ...filterData, ...filterPeriodData };
        break;

      default:
        break;
    }

    return filterData;
  }

  getFilterInputDayValue(value: DateFilterValue) {
    let filterDayData: any = {};
    filterDayData.from = startOfDay(
      utcToZonedTime(value.from as string, value?.timezone as string)
    );
    filterDayData.to = endOfDay(
      utcToZonedTime(value.from as string, value?.timezone as string)
    );
    filterDayData.week = getISOWeek(filterDayData.from);
    filterDayData.month = getMonth(filterDayData.from) + 1;
    filterDayData.quarter = getQuarter(filterDayData.from);
    filterDayData.year = getYear(filterDayData.from);

    return filterDayData;
  }

  getFilterInputWeekValue(value: DateFilterValue) {
    let filterWeekData: any = {};
    filterWeekData.from = startOfISOWeek(
      startOfDay(
        utcToZonedTime(value.from as string, value?.timezone as string)
      )
    );
    filterWeekData.to = endOfDay(
      lastDayOfISOWeek(
        utcToZonedTime(value.from as string, value?.timezone as string)
      )
    );
    filterWeekData.week = getISOWeek(filterWeekData.from);
    filterWeekData.month = getMonth(filterWeekData.from) + 1;
    filterWeekData.quarter = getQuarter(filterWeekData.from);
    filterWeekData.year = getYear(filterWeekData.from);

    return filterWeekData;
  }

  getFilterInputMonthValue(value: DateFilterValue) {
    let filterMonthData: any = {};
    filterMonthData.from = startOfMonth(
      startOfDay(
        utcToZonedTime(value.from as string, value?.timezone as string)
      )
    );
    filterMonthData.to = endOfDay(
      lastDayOfMonth(
        utcToZonedTime(value.from as string, value?.timezone as string)
      )
    );
    filterMonthData.week = getISOWeek(filterMonthData.from);
    filterMonthData.month = getMonth(filterMonthData.from) + 1;
    filterMonthData.quarter = getQuarter(filterMonthData.from);
    filterMonthData.year = getYear(filterMonthData.from);

    return filterMonthData;
  }

  getFilterInputQuarterValue(value: DateFilterValue) {
    let filterQuarterData: any = {};
    filterQuarterData.from = startOfQuarter(
      startOfDay(
        utcToZonedTime(value.from as string, value?.timezone as string)
      )
    );
    filterQuarterData.to = endOfDay(
      lastDayOfQuarter(
        utcToZonedTime(value.from as string, value?.timezone as string)
      )
    );
    filterQuarterData.week = getISOWeek(filterQuarterData.from);
    filterQuarterData.month = getMonth(filterQuarterData.from) + 1;
    filterQuarterData.quarter = getQuarter(filterQuarterData.from);
    filterQuarterData.year = getYear(filterQuarterData.from);

    return filterQuarterData;
  }

  getFilterInputYearValue(value: DateFilterValue) {
    let filterYearData: any = {};
    filterYearData.from = startOfYear(
      startOfDay(
        utcToZonedTime(value.from as string, value?.timezone as string)
      )
    );
    filterYearData.to = endOfYear(
      lastDayOfQuarter(
        utcToZonedTime(value.from as string, value?.timezone as string)
      )
    );
    filterYearData.week = getISOWeek(filterYearData.from);
    filterYearData.month = getMonth(filterYearData.from) + 1;
    filterYearData.quarter = getQuarter(filterYearData.from);
    filterYearData.year = getYear(filterYearData.from);

    return filterYearData;
  }

  getFilterInputPeriodValue(value: DateFilterValue) {
    let filterDayData: any = {};
    filterDayData.from = utcToZonedTime(
      value.from as string,
      value?.timezone as string
    );
    filterDayData.to = utcToZonedTime(
      value.to as string,
      value?.timezone as string
    );
    filterDayData.week = getISOWeek(filterDayData.from);
    filterDayData.month = getMonth(filterDayData.from) + 1;
    filterDayData.quarter = getQuarter(filterDayData.from);
    filterDayData.year = getYear(filterDayData.from);

    return filterDayData;
  }

  getFilterOutputDayValue(value: DateFilterValue) {
    let filterDayData: any = {};
    filterDayData.from = startOfDay(value.from as Date);
    filterDayData.to = endOfDay(value.from as Date);
    filterDayData.week = getISOWeek(filterDayData.from);
    filterDayData.month = getMonth(filterDayData.from) + 1;
    filterDayData.quarter = getQuarter(filterDayData.from);
    filterDayData.year = getYear(filterDayData.from);

    return filterDayData;
  }

  getFilterOutputWeekValue(value: DateFilterValue) {
    let filterWeekData: any = {};
    filterWeekData.from = startOfDay(
      this.getDateOfISOWeek(value.week as number, value.year as number)
    );
    filterWeekData.to = endOfDay(lastDayOfISOWeek(filterWeekData.from as Date));
    filterWeekData.week = value.week;
    filterWeekData.month = getMonth(filterWeekData.from) + 1;
    filterWeekData.quarter = getQuarter(filterWeekData.from);
    filterWeekData.year = getISOWeekYear(filterWeekData.from);

    return filterWeekData;
  }

  getFilterOutputMonthValue(value: DateFilterValue) {
    let filterMonthData: any = {};
    filterMonthData.from = startOfDay(
      this.getFirstDayOfMonth(value.year as number, (value.month as number) - 1)
    );
    filterMonthData.to = endOfDay(lastDayOfMonth(filterMonthData.from as Date));
    filterMonthData.week = getISOWeek(filterMonthData.from);
    filterMonthData.month = value.month;
    filterMonthData.quarter = getQuarter(filterMonthData.from);
    filterMonthData.year = getYear(filterMonthData.from);

    return filterMonthData;
  }

  getFilterOutputQuarterValue(value: DateFilterValue) {
    let filterWeekData: any = {};
    let startMonth: number = 0;
    let endMonth: number = 2;

    switch (value.quarter) {
      case 4:
        startMonth = 9;
        endMonth = 11;
        break;
      case 3:
        startMonth = 6;
        endMonth = 8;
        break;
      case 2:
        startMonth = 3;
        endMonth = 5;
        break;

      default:
        startMonth = 0;
        endMonth = 2;
        break;
    }

    filterWeekData.from = startOfDay(
      this.getFirstDayOfMonth(value.year as number, startMonth as number)
    );
    filterWeekData.to = endOfDay(
      this.getLastDayOfMonth(value.year as number, endMonth as number)
    );
    filterWeekData.week = getISOWeek(filterWeekData.from);
    filterWeekData.month = getMonth(filterWeekData.from) + 1;
    filterWeekData.quarter = value.quarter;
    filterWeekData.year = getYear(filterWeekData.from);

    return filterWeekData;
  }

  getFilterOutputYearValue(value: DateFilterValue) {
    let filterYearData: any = {};
    filterYearData.from = startOfDay(
      this.getFirstDayOfYear(value.year as number)
    );
    filterYearData.to = endOfDay(this.getLastDayOfYear(value.year as number));
    filterYearData.week = getISOWeek(filterYearData.from);
    filterYearData.month = getMonth(filterYearData.from as Date) + 1;
    filterYearData.quarter = getQuarter(filterYearData.from);
    filterYearData.year = getYear(filterYearData.from);

    return filterYearData;
  }

  getFilterOutputPeriodValue(value: DateFilterValue) {
    let filterPeriodData: any = {};
    filterPeriodData.from = value.from;
    filterPeriodData.to = value.to;
    filterPeriodData.week = getISOWeek(filterPeriodData.from);
    filterPeriodData.month = getMonth(filterPeriodData.from) + 1;
    filterPeriodData.quarter = getQuarter(filterPeriodData.from);
    filterPeriodData.year = getYear(filterPeriodData.from);

    return filterPeriodData;
  }

  getTagToday(value: DateFilterValue) {
    let todayDate: DateFilterValue = this.getFilterOutputValue({
      from: utcToZonedTime(new Date(), value?.timezone as string),
      to: utcToZonedTime(new Date(), value?.timezone as string),
      type: DateFilterGroupButtonType.DAY,
      timezone: value.timezone,
    });

    return todayDate;
  }

  getTagYesterday(value: DateFilterValue) {
    let yesterdayDate: DateFilterValue = this.getFilterOutputValue({
      from: subDays(utcToZonedTime(new Date(), value?.timezone as string), 1),
      to: subDays(utcToZonedTime(new Date(), value?.timezone as string), 1),
      type: DateFilterGroupButtonType.DAY,
      timezone: value.timezone,
    });

    return yesterdayDate;
  }

  getTagLast7Days(value: DateFilterValue) {
    let last7DaysDate: DateFilterValue = this.getFilterOutputValue({
      from: startOfDay(
        sub(utcToZonedTime(new Date(), value.timezone as string), {
          days: 6,
        })
      ),
      to: endOfDay(utcToZonedTime(new Date(), value.timezone as string)),
      type: DateFilterGroupButtonType.PERIOD,
      timezone: value.timezone,
    });

    return last7DaysDate;
  }

  getTagLast30Days(value: DateFilterValue) {
    let last30DaysDate = this.getFilterOutputValue({
      from: startOfDay(
        sub(utcToZonedTime(new Date(), value.timezone as string), { days: 29 })
      ),
      to: endOfDay(utcToZonedTime(new Date(), value.timezone as string)),
      type: DateFilterGroupButtonType.PERIOD,
      timezone: value.timezone,
    });

    return last30DaysDate;
  }

  getTagLastMonth(value: DateFilterValue) {
    let lastMonthDate: DateFilterValue = this.getFilterOutputValue({
      from: startOfMonth(
        subMonths(utcToZonedTime(new Date(), value.timezone as string), 1)
      ),
      to: endOfMonth(
        subMonths(utcToZonedTime(new Date(), value.timezone as string), 1)
      ),
      type: DateFilterGroupButtonType.MONTH,
      timezone: value.timezone,
      month:
        getMonth(
          startOfMonth(
            subMonths(utcToZonedTime(new Date(), value.timezone as string), 1)
          )
        ) + 1,
      year: getYear(
        startOfMonth(
          subMonths(utcToZonedTime(new Date(), value.timezone as string), 1)
        )
      ),
    });

    return lastMonthDate;
  }

  getTagThisWeek(value: DateFilterValue) {
    let thisWeekDate: DateFilterValue = this.getFilterOutputValue({
      from: startOfISOWeek(
        utcToZonedTime(new Date(), value.timezone as string)
      ),
      to: endOfISOWeek(utcToZonedTime(new Date(), value.timezone as string)),
      type: DateFilterGroupButtonType.WEEK,
      timezone: value.timezone,
      week: getISOWeek(
        startOfISOWeek(utcToZonedTime(new Date(), value.timezone as string))
      ),
      year: getYear(
        startOfISOWeek(utcToZonedTime(new Date(), value.timezone as string))
      ),
    });

    return thisWeekDate;
  }

  getTagThisMonth(value: DateFilterValue) {
    let thisMonthDate: DateFilterValue = this.getFilterOutputValue({
      from: startOfMonth(utcToZonedTime(new Date(), value.timezone as string)),
      to: endOfMonth(utcToZonedTime(new Date(), value.timezone as string)),
      type: DateFilterGroupButtonType.MONTH,
      timezone: value.timezone,
      month:
        getMonth(
          startOfMonth(utcToZonedTime(new Date(), value.timezone as string))
        ) + 1,
      year: getYear(
        endOfMonth(utcToZonedTime(new Date(), value.timezone as string))
      ),
    });

    return thisMonthDate;
  }

  getDateOfISOWeek(w: number, y: number) {
    var simple = new Date(y, 0, 1 + (w - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  }

  getFirstDayOfMonth(year: number, month: number) {
    return new Date(year, month, 1);
  }

  getLastDayOfMonth(year: number, month: number) {
    return new Date(year, month + 1, 0);
  }

  getFirstDayOfYear(year: number) {
    return new Date(year, 0, 1);
  }

  getLastDayOfYear(year: number) {
    return new Date(year, 11, 31);
  }

  formatModelValue(filterValue: DateFilterValue) {
    let modelValue: DateFilterValue = {};

    modelValue.timezone = filterValue.timezone;
    modelValue.type = filterValue.type;
    modelValue.from = zonedTimeToUtc(
      filterValue.from as Date,
      filterValue.timezone as string
    ).toISOString();
    modelValue.to = zonedTimeToUtc(
      filterValue.to as Date,
      filterValue.timezone as string
    ).toISOString();

    return modelValue;
  }
}
