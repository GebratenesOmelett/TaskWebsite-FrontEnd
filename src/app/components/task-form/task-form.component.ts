import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit{
  TaskFormGroup!: FormGroup;
  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.TaskFormGroup = this.formBuilder.group({
      task: this.formBuilder.group({
        title: "",
        Importance: "",
        Description: "",
        Deadline: new FormControl('yyyy-MM-dd')
      })
    })
  }
}
// ngOnInit(): void {
//   this.checkoutFormGroup = this.formBuilder.group({
//     customer: this.formBuilder.group({
//         firstName: new FormControl('', [Validators.required, GeneralValidation.notOnlyWhiteSpace]),
//         lastName: new FormControl('', [Validators.required, GeneralValidation.notOnlyWhiteSpace]),
//         email: new FormControl('', [Validators.required,
//           Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
//         password: new FormControl('', [Validators.required, GeneralValidation.notOnlyWhiteSpace, Validators.minLength(8)]),
//         passwordRepeat: new FormControl('', [])
//       },
//       {
//         validators : PasswordValidation.passwordsShouldBeTheSame("password", "passwordRepeat")
//       })
//   });
// }
