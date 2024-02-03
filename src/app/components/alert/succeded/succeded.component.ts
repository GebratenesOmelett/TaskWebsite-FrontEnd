import { Component } from '@angular/core';
import {SuccededService} from "../../../service/alert/succeded.service";
import {NgIf} from "@angular/common";

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
