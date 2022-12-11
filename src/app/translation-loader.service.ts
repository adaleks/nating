import { MessageService } from '@progress/kendo-angular-l10n';
// import { AppKendoMessageService } from './kendo-message.service';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

export class AppTranslationLoader implements TranslateLoader {
  constructor(
    private http: HttpClient // private appKendoMessages: AppKendoMessageService
  ) {}

  getTranslation(lang: string): Observable<any> {
    // load app translations
    const appTranslations = this.http.get<any>(`/assets/i18n/${lang}.json`);
    // load app translations
    // const kendoTranslations = this.http.get<any>(
    //   `/v2/assets/translations/kendo/${lang}.json`
    // );

    return forkJoin([appTranslations]).pipe(
      map(([t1]) => {
        return {
          ...t1,
          // ...t2,
        };
      }),
      tap((t) => {
        // this.appKendoMessages.setLanguageMessages(lang, t);
      })
    );
  }
}

export const APP_TRANSLATION_LOADER_PROVIDER = {
  provide: TranslateLoader,
  useClass: AppTranslationLoader,
  deps: [HttpClient, MessageService],
};
