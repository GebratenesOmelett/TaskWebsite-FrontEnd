import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit{
  taskFormGroup!: FormGroup;
  actualDate = new Date()
  minimumDate : any

  currentYear = this.actualDate.getUTCFullYear();
  currentMonth = this.actualDate.getUTCMonth() +1;
  currentDay = this.actualDate.getUTCDate();
  FinalMonth : any;
  FinalDay : any;
  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.calenderMinimumDate();
    this.taskFormGroup = this.formBuilder.group({
      task: this.formBuilder.group({
        title: "",
        importance: "",
        description: "",
        deadline: new FormControl('yyyy-MM-dd')
      })
    })
  }
  get title(){
    return this.taskFormGroup.get('task.title')
  }
  get importance(){
    return this.taskFormGroup.get('task.importance')
  }
  get description(){
    return this.taskFormGroup.get('task.description')
  }
  get deadline(){
    return this.taskFormGroup.get('task.deadline')
  }

  calenderMinimumDate(){
    if(this.currentMonth < 10){
      this.FinalMonth = "0" + this.currentMonth
    }
    else{
      this.FinalMonth = this.currentMonth;
    }

    if(this.currentDay< 10){
      this.FinalDay = "0" + this.currentDay;
    }
    else {
      this.FinalDay = this.currentDay;
    }

    this.minimumDate = this.currentYear + "-" + this.FinalMonth + "-" + this.FinalDay;
  }
}

