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
  private defaultBaseUrl = "https://task-backend.up.railway.app"
  private taskPostUrl = this.defaultBaseUrl + "/api/tasks";
  private getTasksUrl = this.defaultBaseUrl + "/api/tasks/";
  private deleteTaskUrl = this.defaultBaseUrl + "/api/tasks/";

  public listOfTasks = new BehaviorSubject<Task[]>(null!)

  actualDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
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
      return this.httpClient.post<Task>(this.taskPostUrl, task, {headers: headers_object});
    }));
  }

  deleteTask(id: number): Observable<any> {
    return this.customerService.customer.pipe(take(1), exhaustMap(customer => {
        let headers_object = new HttpHeaders().set("Authorization", "Bearer " + customer.token);
        let finalUrl = this.deleteTaskUrl + id;
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

  addTask(task: Task) {
    this.listOfTasks.pipe(take(1)).subscribe(val => {
      if (val == null) {
        val = [];
      }
      val.unshift(task);
      this.listOfTasks.next(val);
    })
  }

  getCreationDate(): string{
    return new Date(this.getCalenderMinimumDate()).toISOString().split('T')[0]
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
