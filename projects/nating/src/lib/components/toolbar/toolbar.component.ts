import {
  Component,
  ContentChildren,
  OnInit,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { NatiTemplate } from '../../directives/template.directive';

@Component({
  selector: 'n-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent implements OnInit {
  @Output() onClear = new EventEmitter<any>();
  @Output() onReset = new EventEmitter<any>();

  @ContentChildren(NatiTemplate) templates: QueryList<any>;
  actionsTemplate: TemplateRef<any>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'actions':
          this.actionsTemplate = item.template;
          break;

        default:
          this.actionsTemplate = item.template;
          break;
      }
    });
  }

  onClickHandler(event: MouseEvent) {
    this.onClear.emit(event);
  }

  onResetHandler(event: MouseEvent) {
    this.onReset.emit(event);
  }
}
