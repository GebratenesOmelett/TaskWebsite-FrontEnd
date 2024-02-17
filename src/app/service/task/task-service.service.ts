import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, exhaustMap, Observable, take, tap} from "rxjs";
import {AuthResponse} from "../../entity/auth/auth-response";
import {TaskCreate} from "../../entity/task/task-create";
import {CustomerServiceService} from "../customer/customer-service.service";
import {Task} from "../../entity/task/task";

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private taskPostUrl = "http://localhost:8080/api/tasks";
  private getTasksUrl = "http://localhost:8080/api/tasks/get/";
  private deleteTaskUrl = "http://localhost:8080/api/tasks/";

  // public listOfTasks: Task[];
  public listOfTasks = new BehaviorSubject<Task[]>(null!)

  actualDate = new Date()
  currentYear = this.actualDate.getUTCFullYear();
  currentMonth = this.actualDate.getUTCMonth() + 1;
  currentDay = this.actualDate.getUTCDate();
  FinalMonth: any;
  FinalDay: any;

  constructor(private httpClient: HttpClient,
              private customerService: CustomerServiceService) {
  }

  createTask(task: TaskCreate): Observable<any> {
    return this.customerService.customer.pipe(take(1), exhaustMap(customer => {
      let headers_object = new HttpHeaders().set("Authorization", "Bearer " + customer.token);
      task.email = customer.email;
      return this.httpClient.post<AuthResponse>(this.taskPostUrl, task, {headers: headers_object});
    }));
  }

  deleteTask(id: number) {
    return this.customerService.customer.pipe(take(1), exhaustMap(customer => {
        let headers_object = new HttpHeaders().set("Authorization", "Bearer " + customer.token);
        let finalUrl = this.deleteTaskUrl + id;
        console.log(id);
        return this.httpClient.delete(finalUrl, {headers: headers_object})
      }
    ))
  };

  getTasks(): Observable<any> {
    return this.customerService.customer.pipe(take(2), exhaustMap(customer => {
      let headers_object = new HttpHeaders().set("Authorization", "Bearer " + customer.token);
      let finalUrl = this.getTasksUrl + customer.email;
      return this.httpClient.get<Task[]>(finalUrl, {headers: headers_object}).pipe(tap(resData => {
          this.listOfTasks.next(resData)
        }
      ));
    }));
  }

  addTask(taskCreate: TaskCreate) {
    this.listOfTasks.pipe(take(1)).subscribe(val => {
      if (val == null) {
        val = [];
      }
      let task = new Task(val.length + 1,taskCreate.title, taskCreate.importance, taskCreate.description, new Date(this.getCalenderMinimumDate()).toISOString().split('T')[0], taskCreate.deadLine);
      val.unshift(task);
      this.listOfTasks.next(val);
    })
  }

  logout() {
    this.listOfTasks.next(null!);
  }

  getCalenderMinimumDate() {
    if (this.currentMonth < 10) {
      this.FinalMonth = "0" + this.currentMonth
    } else {
      this.FinalMonth = this.currentMonth;
    }

    if (this.currentDay < 10) {
      this.FinalDay = "0" + this.currentDay;
    } else {
      this.FinalDay = this.currentDay;
    }

    return this.currentYear + "-" + this.FinalMonth + "-" + this.FinalDay;
  }
}
