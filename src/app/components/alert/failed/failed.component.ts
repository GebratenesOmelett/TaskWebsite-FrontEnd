import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FailedService} from "../../../service/alert/failed.service";

@Component({
  selector: 'app-failed',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './failed.component.html',
  styleUrl: './failed.component.css'
})
export class FailedComponent {
  constructor(public failedService: FailedService) {
  }
}
