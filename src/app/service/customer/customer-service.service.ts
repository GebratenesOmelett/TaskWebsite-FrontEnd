import { Injectable } from '@angular/core';
import {AuthResponse} from "../../entity/auth/auth-response";
import {Customer} from "../../entity/customer/customer";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CustomerLogin} from "../../entity/customer/customer-login";
import {CustomerCreate} from "../../entity/customer/customer-create";

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  private defaultBaseUrl = "https://task-backend.up.railway.app"
  private loginUrl = this.defaultBaseUrl + "/api/customers/login";
  private registerUrl = this.defaultBaseUrl + "/api/customers";

  customer = new BehaviorSubject<Customer>(null!);

  constructor(private httpClient: HttpClient) {
  }

  loginCustomer(customerLogin: CustomerLogin): Observable<any> {
    return this.httpClient.post<AuthResponse>(this.loginUrl, customerLogin)
      .pipe(
        tap(resData =>{
          const expirationDate = new Date(new Date().getTime() + +resData.expiresIn);
          const customer =new Customer(resData.email, resData.token, expirationDate);
          this.customer.next(customer);
        })
      )
  }
  registerCustomer(customer: CustomerCreate): Observable<any>{
    return this.httpClient.post<CustomerCreate>(this.registerUrl, customer);
  }
  logout(){
    this.customer.next(null!);
  }
}
