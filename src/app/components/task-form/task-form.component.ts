import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {TaskServiceService} from "../../service/task/task-service.service";
import {TaskCreate} from "../../entity/task/task-create";
import {CustomerServiceService} from "../../service/customer/customer-service.service";
import {MatTableDataSource} from "@angular/material/table";
import {Task} from "../../entity/task/task";
import {Subscription, take} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  taskFormGroup!: FormGroup;
  minimumDate: any

  displayedColumns = ['title', 'importance', 'description', 'creationDate', 'deadLine'];
  // @ts-ignore
  dataSource: MatTableDataSource<Task>;
  listOfTasks: Task[] = [];
  private taskSub!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private formBuilder: FormBuilder,
              private taskService: TaskServiceService,
              private customerService: CustomerServiceService) {
    this.dataSource = new MatTableDataSource(this.listOfTasks);
  }

  ngOnInit(): void {
    this.customerService.customer.subscribe(user => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
          this.taskSub = this.taskService.getTasks().subscribe(tasks => {
            this.listOfTasks = tasks
            this.dataSource = new MatTableDataSource(tasks);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
      }
    });
    this.minimumDate = this.taskService.getCalenderMinimumDate();
    this.taskFormGroup = this.formBuilder.group({
      task: this.formBuilder.group({
        title: "",
        importance: "",
        description: "",
        deadline: new FormControl('yyyy-MM-dd')
      })
    })
  }

  getTasks() {
    this.taskService.listOfTasks.pipe(take(1)).subscribe(tasks => {
      this.listOfTasks = tasks
      this.dataSource = new MatTableDataSource(tasks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  get title() {
    return this.taskFormGroup.get('task.title')
  }

  get importance() {
    return this.taskFormGroup.get('task.importance')
  }

  get description() {
    return this.taskFormGroup.get('task.description')
  }

  get deadline() {
    return this.taskFormGroup.get('task.deadline')
  }



  onSubmit() {
    let task = new TaskCreate(this.title?.value, this.importance?.value, this.description?.value, this.deadline?.value);
    this.taskService.addTask(task);
    if (this.isAuthenticated) {
      this.taskService.CreateTask(task).subscribe(
          {
            next: response => {
              this.getTasks()
            }
          }
      )
    } else {
        this.getTasks()
    }


  }

  ngOnDestroy(): void {
    if (this.isAuthenticated) {
      this.taskSub.unsubscribe();
      this.isAuthenticated = false;
    }
  }
}
