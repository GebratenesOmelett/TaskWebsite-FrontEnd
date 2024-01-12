import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Task} from "../../entity/task/task";
import { MatPaginator } from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements AfterViewInit{
  taskArray: Task[] = [new Task("awf","fwa","faw",new Date(Date.now()) , new Date(Date.now())),
    new Task("awf","fwa","faw",new Date(Date.now()) , new Date(Date.now())),
    new Task("awf","fwa","faw",new Date(Date.now()) , new Date(Date.now())),
    new Task("awf","fwa","faw",new Date(Date.now()) , new Date(Date.now())),
    new Task("awf","fwa","faw",new Date(Date.now()) , new Date(Date.now())),
    new Task("awf","fwa","faw",new Date(Date.now()) , new Date(Date.now()))];
  dataSource =MatTableDataSource<Task>;
  displayedColumns:string[]=["sfasfa","sfaasf","sfaafs","fsasaf","sfaaf"];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    // this.dataSource = new  MatTableDataSource(this.taskArray);
    // this.dataSource.paginator = this.paginator
    // console.log(this.dataSource)
  }



}
