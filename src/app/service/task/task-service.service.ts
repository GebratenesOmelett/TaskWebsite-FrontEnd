import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {exhaustMap, Observable, take} from "rxjs";
import {AuthResponse} from "../../entity/auth/auth-response";
import {TaskCreate} from "../../entity/task/task-create";
import {CustomerServiceService} from "../customer/customer-service.service";

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private TaskPostUrl = "http://localhost:8080/api/tasks";

  constructor(private httpClient: HttpClient,
              private customerService: CustomerServiceService) {
  }

  CreateTask(task: TaskCreate): Observable<any> {
    return this.customerService.customer.pipe(take(1), exhaustMap(customer => {
      let headers_object = new HttpHeaders().set("Authorization", "Bearer " + customer.token);
      console.log(task);
      return this.httpClient.post<AuthResponse>(this.TaskPostUrl, task, {headers: headers_object});
    }));
  }
}
