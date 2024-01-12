import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private TaskPostUrl = "http://localhost:8080/api/tasks";
  constructor(private httpClient: HttpClient) { }
}
