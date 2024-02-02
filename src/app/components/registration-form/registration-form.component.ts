import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerServiceService} from "../../service/customer/customer-service.service";
import {Router} from "@angular/router";
import {CustomerCreate} from "../../entity/customer/customer-create";
import {PasswordValidation} from "../../validation/password-validation";

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
        email: new FormControl('', [Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        password: new FormControl('', [Validators.required, Validators.minLength(8),
          PasswordValidation.notOnlyWhiteSpace]),
        passwordRepeat: new FormControl('', [])
      },
        {
          validators : PasswordValidation.passwordsShouldBeTheSame("password", "passwordRepeat")
        })
    })
  }
  get passwordValidation(){
    return this.registerFormGroup.controls['account'];
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
    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
      return
    }
    let customerCreate = new CustomerCreate(this.email?.value, this.password?.value);
    this.customerService.registerCustomer(customerCreate).subscribe({
        next: response => {
          this.route.navigateByUrl("/home")
        }
      }
    );
  }
}
