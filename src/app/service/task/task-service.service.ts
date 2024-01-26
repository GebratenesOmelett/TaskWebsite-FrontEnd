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

  // public listOfTasks: Task[];
  listOfTasks = new BehaviorSubject<Task[]>(null!)

  constructor(private httpClient: HttpClient,
              private customerService: CustomerServiceService) {
  }

  CreateTask(task: TaskCreate): Observable<any> {
    return this.customerService.customer.pipe(take(1), exhaustMap(customer => {
      let headers_object = new HttpHeaders().set("Authorization", "Bearer " + customer.token);
      task.email = customer.email;
      return this.httpClient.post<AuthResponse>(this.taskPostUrl, task, {headers: headers_object});
    }));
  }

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

  addTask(task: TaskCreate) {
    // let
  }
}
