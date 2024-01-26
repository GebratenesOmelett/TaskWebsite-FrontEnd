import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Task} from "../../entity/task/task";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {TaskServiceService} from "../../service/task/task-service.service";
import {CustomerServiceService} from "../../service/customer/customer-service.service";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements AfterViewInit, OnInit {
  displayedColumns = ['title', 'importance', 'description', 'creationDate', 'deadLine'];
  // @ts-ignore
  dataSource: MatTableDataSource<Task>;
  listOfTasks: Task[] = [];
  isAuthenticated = false;
  private taskSub!: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private taskService: TaskServiceService,
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
  }

  ngAfterViewInit(): void {
  }




}







