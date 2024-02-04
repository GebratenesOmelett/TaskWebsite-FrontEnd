import {Component, OnDestroy, OnInit} from '@angular/core';
import {CustomerServiceService} from "../../service/customer/customer-service.service";
import {Subscription} from "rxjs";
import {TaskServiceService} from "../../service/task/task-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  email: string = "";
  isAuthenticated = false;
  private userSub!: Subscription;

  constructor(protected customerService: CustomerServiceService,
              private taskService: TaskServiceService,
              private route: Router) {
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
    this.taskService.logout();
    this.route.navigate(['/home']);
    location.reload();
  }
}
