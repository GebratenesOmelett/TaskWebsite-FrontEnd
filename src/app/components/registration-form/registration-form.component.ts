import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerServiceService} from "../../service/customer/customer-service.service";
import {Router} from "@angular/router";
import {CustomerCreate} from "../../entity/customer/customer-create";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registerFormGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private customerService: CustomerServiceService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      account: this.formBuilder.group({
        email: "",
        password: "",
        passwordRepeat: ""
      })
    })
  }

  get email() {
    return this.registerFormGroup.get('account.email')
  }

  get password() {
    return this.registerFormGroup.get('account.password')
  }

  get passwordRepeat() {
    return this.registerFormGroup.get('account.passwordRepeat')
  }

  onSubmit() {
    let customerCreate = new CustomerCreate(this.email?.value, this.password?.value);
    this.customerService.registerCustomer(customerCreate).subscribe({
        next: response => {
          this.route.navigateByUrl("/home")
        }
      }
    );
  }
}
