import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  toggleContent: BehaviorSubject<any> = new BehaviorSubject(false);
  selectPeriodType: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor() {}
}
