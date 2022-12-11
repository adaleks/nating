import {
  Component,
  Input,
  Output,
  EventEmitter,
  TemplateRef,
  ViewChild,
  forwardRef,
  OnInit,
} from '@angular/core';
import { SharedService } from '../../shared.service';
// import { DateFilterContentComponent } from '../date-filter-content/date-filter-content.component';
import { Subscription } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'nk-date-filter-toolbar-actions',
  templateUrl: './date-filter-toolbar-actions.component.html',
  styleUrls: ['./date-filter-toolbar-actions.component.scss'],
})
// extends ToolBarToolComponent
export class DateFilterToolbarActionsComponent implements OnInit {
  public contentIsExpanded: boolean = false;
  public toggleContentSubscription: Subscription;

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.toggleContentSubscription = this.sharedService.toggleContent.subscribe(
      (isExpanded: boolean) => {
        this.contentIsExpanded = isExpanded;
      }
    );
  }

  onToggleClick(e: MouseEvent) {
    this.contentIsExpanded = !this.contentIsExpanded;
    this.sharedService.toggleContent.next(this.contentIsExpanded);
  }

  onResetClick(e: MouseEvent) {}

  onClearClick(e: MouseEvent) {}
}
