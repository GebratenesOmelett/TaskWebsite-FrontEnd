import {Component, OnDestroy, OnInit} from '@angular/core';
import {CustomerServiceService} from "../../service/customer/customer-service.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  email: string = "";
  isAuthenticated = false;
  private userSub!: Subscription;

  constructor(private customerService: CustomerServiceService) {
  }

  ngOnInit(): void {
    this.userSub = this.customerService.customer.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.email = user.email;
      }
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  onLogout() {
    this.customerService.logout();
  }
}
