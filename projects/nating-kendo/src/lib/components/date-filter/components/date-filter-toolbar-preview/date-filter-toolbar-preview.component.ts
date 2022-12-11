import { Component, Input, OnInit } from '@angular/core';
import { DateFilterValue } from '../../date-filter.model';

@Component({
  selector: 'nk-date-filter-toolbar-preview',
  templateUrl: './date-filter-toolbar-preview.component.html',
  styleUrls: ['./date-filter-toolbar-preview.component.scss'],
})
export class DateFilterToolbarPreviewComponent implements OnInit {
  @Input() value: DateFilterValue;

  constructor() {}

  ngOnInit(): void {}
}
