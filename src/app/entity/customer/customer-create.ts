export class CustomerCreate {
  constructor(public email: string,
              public password: string,
              public passwordRepeat: string) {
  }
}
