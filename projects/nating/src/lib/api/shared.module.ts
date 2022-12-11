import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NatiTemplate } from '../directives/template.directive';

@NgModule({
  declarations: [NatiTemplate],
  imports: [CommonModule],
  exports: [NatiTemplate],
})
export class SharedModule {}
