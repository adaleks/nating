import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { MessageService } from '@progress/kendo-angular-l10n';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { APP_TRANSLATION_LOADER_PROVIDER } from './translation-loader.service';
import { DateFilterModule } from '@adaleks/nating-kendo';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ToolBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DateFilterModule,
    TranslateModule.forRoot({
      // could read from localstorage
      // could use appinitializer to setup translation language
      defaultLanguage: 'en',
      loader: APP_TRANSLATION_LOADER_PROVIDER,
      extend: true,
      isolate: false,
    }),
    DateInputsModule,
    DropDownsModule,
  ],
  exports: [TranslateModule],
  providers: [TranslateService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(translate: TranslateService) {
    // translate.setDefaultLang('en');
    // translate.use('en');
    // translate.use('sr');
  }
}
