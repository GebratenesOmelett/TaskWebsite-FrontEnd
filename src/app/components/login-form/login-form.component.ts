import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerServiceService} from "../../service/customer/customer-service.service";
import {Router} from "@angular/router";
import {CustomerLogin} from "../../entity/customer/customer-login";
import {SuccededService} from "../../service/alert/succeded.service";
import {FailedService} from "../../service/alert/failed.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit{
  loginFormGroup!: FormGroup

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerServiceService,
              private route: Router,
              private succededService: SuccededService,
              private failedService: FailedService) {
  }
  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      account: this.formBuilder.group({
        email: "",
        password: ""
      })
    })
  }
  get email() {
    return this.loginFormGroup.get('account.email')
  }

  get password() {
    return this.loginFormGroup.get('account.password')
  }
  onSubmit(){
    let customerLogin = new CustomerLogin(this.email?.value, this.password?.value);
    this.customerService.loginCustomer(customerLogin).subscribe(
      {
        next: response=>{
          this.route.navigate(['/home']);
          this.succededService.showAnimatedDiv("Successfully logged in");
        },
        error: err => {
          this.failedService.showAnimatedDiv("Wrong password or email");
        }
      }
    )
  }

}
