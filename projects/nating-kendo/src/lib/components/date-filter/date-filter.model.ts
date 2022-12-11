export interface DateFilterValue {
  from?: Date | string | null | undefined;
  to?: Date | string | null | undefined;
  type?: string;
  timezone?: string | null | undefined;
  week?: number;
  year?: number;
  month?: number;
  quarter?: number;
}

export interface DateFilterGroupButton {
  text: string;
  index: number;
  type: string;
  selected: boolean;
}

export interface DateFilterTagFilterItem {
  text: string;
  index: number;
  type: string;
}

export enum DateFilterTagFilterItemType {
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  LAST_7_DAYS = 'last_7_days',
  LAST_30_DAYS = 'last_30_days',
  LAST_MONTH = 'last_month',
  THIS_WEEK = 'this_week',
  THIS_MONTH = 'this_month',
}

export enum DateFilterGroupButtonType {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  QUARTER = 'quarter',
  YEAR = 'year',
  PERIOD = 'period',
}
