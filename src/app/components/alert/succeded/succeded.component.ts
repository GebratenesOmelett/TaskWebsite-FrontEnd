import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {SuccededService} from "../../../service/alert/succeded.service";

@Component({
  selector: 'app-succeded',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './succeded.component.html',
  styleUrl: './succeded.component.css'
})
export class SuccededComponent {
    constructor(public succededService: SuccededService) {
    }
}
