import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FailedService {

  constructor() { }
  public isDisplayed: boolean = false;
  public text: string = "error"
  showAnimatedDiv(text: string) {
    this.text = text;
    this.isDisplayed = true;
    setTimeout(() => {
      this.isDisplayed = false;
    }, 6000);
  }
}
