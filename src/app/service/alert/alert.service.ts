import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }
  public isDisplayed: boolean = false;
  showAnimatedDiv() {
    this.isDisplayed = true;
    setTimeout(() => {
      this.isDisplayed = false;
    }, 6000);
  }
}
