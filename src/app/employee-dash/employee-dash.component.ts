import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee-dash',
  templateUrl: './employee-dash.component.html',
  styleUrls: ['./employee-dash.component.css']
})
export class EmployeeDashComponent implements OnInit {

  formValue!: FormGroup

  constructor(private formBuilder: FormBuilder) {

    this.formValue = this.formBuilder.group({

      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']

    })

  }

  ngOnInit(): void {
  }

}
