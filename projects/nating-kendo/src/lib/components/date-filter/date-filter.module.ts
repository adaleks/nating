import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateFilterComponent } from './date-filter.component';
import { DateFilterToolbarActionsComponent } from './components/date-filter-toolbar-actions/date-filter-toolbar-actions.component';
import { DateFilterToolbarPreviewComponent } from './components/date-filter-toolbar-preview/date-filter-toolbar-preview.component';
import { DateFilterContentComponent } from './components/date-filter-content/date-filter-content.component';
import { ToolbarModule } from '@adaleks/nating';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { TranslateModule } from '@ngx-translate/core';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { IntlModule } from '@progress/kendo-angular-intl';

@NgModule({
  providers: [],
  declarations: [
    DateFilterComponent,
    DateFilterToolbarActionsComponent,
    DateFilterToolbarPreviewComponent,
    DateFilterContentComponent,
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonsModule,
    DropDownsModule,
    TranslateModule.forChild({
      extend: true,
      isolate: false,
    }),
    DateInputsModule,
    FormsModule,
    ReactiveFormsModule,
    IntlModule,
  ],
  exports: [
    DateFilterComponent,
    DateFilterToolbarActionsComponent,
    DateFilterToolbarPreviewComponent,
    DateFilterContentComponent,
  ],
})
export class DateFilterModule {}
