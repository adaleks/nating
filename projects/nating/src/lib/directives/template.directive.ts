import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[nTemplate]',
  host: {},
})
export class NatiTemplate {
  @Input() type: string;

  @Input('nTemplate') name: string;

  constructor(public template: TemplateRef<any>) {}

  getType(): string {
    return this.name;
  }
}
