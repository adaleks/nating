import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { SharedModule } from '../../api/shared.module';
import { NatiTemplate } from '../../directives/template.directive';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, SharedModule],
  exports: [ToolbarComponent],
})
export class ToolbarModule {}
